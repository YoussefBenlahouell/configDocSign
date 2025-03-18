import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakInstance } from "keycloak-js";
import { TokenStorageService } from "../user/services/token-storage.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

declare var Keycloak: any;

@Injectable({
  providedIn: "root",
})
export class KeyclockSecurityService {
  public kc: KeycloakInstance | undefined;
  private _silentRefresh: boolean = false;

  constructor(
      private http: HttpClient,
      private tokenStorage: TokenStorageService,
      private router: Router
  ) {}

  public async init(): Promise<void> {
    console.log("Initializing Keycloak...");
    this.kc = new Keycloak({
      url: "http://localhost:8180/auth/",
      realm: "ms-realm",
      clientId: "angular-client",
    });

    try {
      await this.kc.init({
        onLoad: "login-required",
        checkLoginIframe: false,
        redirectUri: "http://localhost:80/dashbord",
      });
      console.log("Keycloak initialized successfully, token:", this.kc.token);

      if (this.kc.token && this.kc.refreshToken) {
        this.tokenStorage.saveToken(this.kc.token);
        this.tokenStorage.saveRefreshToken(this.kc.refreshToken);
        console.log("User token stored:", this.kc.token);
        await this.router.navigate(["/dashbord"]);
      } else {
        console.warn("No token received from Keycloak");
      }
    } catch (error) {
      console.error("Keycloak initialization failed:", error);
      await this.router.navigate(["/login-error"]);
    }
  }

  public tokenadmin(): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username: "admin",
        password: "admin",
        grant_type: "password",
        client_id: "admin-cli",
      },
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    return this.http.post(
        "http://localhost:8180/auth/realms/master/protocol/openid-connect/token",
        params.toString(),
        httpOptions
    );
  }

  public async isLoggedIn(): Promise<boolean> {
    try {
      if (!this.kc || !this.kc.authenticated) {
        console.log("User not authenticated");
        return false;
      }
      // Ne pas appeler updateToken immédiatement après login, juste vérifier l'état
      console.log("User is logged in:", this.kc.authenticated);
      return this.kc.authenticated;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  }

  public isTokenExpired(minValidity: number = 0): boolean {
    return this.kc ? this.kc.isTokenExpired(minValidity) : true;
  }

  public async updateToken(minValidity = 5): Promise<boolean> {
    if (!this.kc) {
      throw new Error("Keycloak Angular library is not initialized.");
    }

    if (this._silentRefresh && this.isTokenExpired()) {
      throw new Error("Failed to refresh the token, or the session is expired");
    }

    try {
      const refreshed = await this.kc.updateToken(minValidity);
      console.log("Token refreshed:", refreshed);
      if (refreshed && this.kc.token && this.kc.refreshToken) {
        this.tokenStorage.saveToken(this.kc.token);
        this.tokenStorage.saveRefreshToken(this.kc.refreshToken);
      }
      return refreshed;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }

  public getUserRoles(allRoles: boolean = true): string[] {
    const roles: string[] = [];
    if (!this.kc) {
      console.warn("Keycloak instance not initialized");
      return roles;
    }

    if (this.kc.resourceAccess) {
      for (const key in this.kc.resourceAccess) {
        if (this.kc.resourceAccess.hasOwnProperty(key)) {
          const resourceAccess: any = this.kc.resourceAccess[key];
          const clientRoles = resourceAccess["roles"] || [];
          roles.push(...clientRoles);
        }
      }
    }
    if (allRoles && this.kc.realmAccess) {
      const realmRoles = this.kc.realmAccess["roles"] || [];
      roles.push(...realmRoles);
    }
    console.log("User roles:", roles);
    return roles;
  }

  public getToken(): string | undefined {
    return this.kc?.token;
  }
}