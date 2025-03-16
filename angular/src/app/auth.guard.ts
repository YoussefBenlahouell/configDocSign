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
  constructor(
      private router: Router, // Corrigé avec private
      private keycloakService: KeyclockSecurityService // Renommé pour clarté
  ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise(async (resolve) => {
      try {
        const authenticated = await this.keycloakService.isLoggedIn();
        const roles = await this.keycloakService.getUserRoles(true);
        console.log("Authenticated:", authenticated, "Roles:", roles);

        const result = await this.isAccessAllowed(route, state, authenticated, roles);
        resolve(result);
      } catch (error) {
        console.error("Error during access validation:", error);
        resolve(false);
      }
    });
  }

  async isAccessAllowed(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      authenticated: boolean,
      roles: string[]
  ): Promise<boolean | UrlTree> {
    console.log("Checking access for route:", route.url, "State:", state.url);
    if (!authenticated) {
      console.log("User not authenticated, relying on Keycloak redirect");
      return false; // Keycloak gère la redirection via "login-required"
    }

    const requiredRoles = route.data?.roles;
    console.log("Required roles:", requiredRoles, "User roles:", roles);
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      console.log("No roles required, access granted");
      return true;
    }

    const granted = requiredRoles.every((role) => roles.includes(role));
    if (!granted) {
      console.log("Access denied, redirecting to /welcome");
      return this.router.parseUrl("/welcome"); // Redirection vers /welcome
    }
    console.log("Access granted");
    return true;
  }
}