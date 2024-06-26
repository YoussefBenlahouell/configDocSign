import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { KeyclockSecurityService } from "./services/keyclock-security.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  protected router: Router;
  protected authenticated: boolean;
  protected roles: string[];
  constructor(
    router: Router,
    public keycloakAngular: KeyclockSecurityService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) => {
      try {
        this.authenticated = await this.keycloakAngular.isLoggedIn();
        this.roles = await this.keycloakAngular.getUserRoles(true);

        const result = await this.isAccessAllowed(route, state);
        resolve(result);
      } catch (error) {
        reject("An error happened during access validation. Details:" + error);
      }
    });
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloakAngular.kc.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;

    let granted = false;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      granted = true;
      return granted;
    }

    // Allow the user to proceed if all the required roles are present.
    granted = requiredRoles.every((role) => this.roles.includes(role));

    // Routing user into permission denied view if don't have necessary roles.
    if (!granted) {
      await this.router.navigate(["permission-denied"]);
    }

    return granted;
  }
}
