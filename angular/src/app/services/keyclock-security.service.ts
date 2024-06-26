import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakInstance } from "keycloak-js";
import { SiginupService } from "../user/services/siginup.service";
import { TokenStorageService } from "../user/services/token-storage.service";
import {
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent,
} from "rxjs";
import { map, catchError, filter, scan } from "rxjs/operators";
import { Observable } from "rxjs";
declare var Keycloak: any;
@Injectable({
  providedIn: "root",
})
export class KeyclockSecurityService {
  public kc: KeycloakInstance;
  private _silentRefresh: boolean;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  public async init() {
    this.kc = new Keycloak({
      url: "http://keycloak:8080/auth/",
      realm: "ms-realm",
      clientId: "angular-client",
    });
    await this.kc.init({ onLoad: "check-sso" /*"login-required*/ });
    /*******store admin acces in locale stroage *****/
    let tokenadmin = null;
    this.tokenadmin().subscribe(
      (res) => {
        tokenadmin = res.access_token;
      },
      (error) => {
        console.log(error);
      },
      () => {
        if (tokenadmin != null) {
          this.tokenStorage.saveToken(tokenadmin);
          this.tokenStorage.saveRefreshToken(tokenadmin);
        }
      }
    );
    console.log(this.kc.token);
  }

  public tokenadmin(): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        username: "yassine.elj",
        password: "123456",
        grant_type: "password",
        client_id: "admin-cli",
      } /*  client_secret:'eUplQv53SE81rg5I4a9ez9pbKYJYwqM6',grant_type:'client_credentials',client_id:'admin-cli',*/,
    });
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    console.log(params);
    return this.http.post(
      "http://keycloak:8080/auth/realms/master/protocol/openid-connect/token",
      params.toString(),
      httpOptions
    );
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      if (!this.kc.authenticated) {
        return false;
      }
      await this.updateToken(20);
      return true;
    } catch (error) {
      return false;
    }
  }
  isTokenExpired(minValidity: number = 0): boolean {
    return this.kc.isTokenExpired(minValidity);
  }

  public async updateToken(minValidity = 5) {
    // TODO: this is a workaround until the silent refresh (issue #43)
    // is not implemented, avoiding the redirect loop.
    if (this._silentRefresh) {
      if (this.isTokenExpired()) {
        throw new Error(
          "Failed to refresh the token, or the session is expired"
        );
      }

      return true;
    }

    if (!this.kc) {
      throw new Error("Keycloak Angular library is not initialized.");
    }

    return this.kc.updateToken(minValidity);
  }

  getUserRoles(allRoles: boolean = true): string[] {
    let roles: string[] = [];
    if (this.kc.resourceAccess) {
      for (const key in this.kc.resourceAccess) {
        if (this.kc.resourceAccess.hasOwnProperty(key)) {
          const resourceAccess: any = this.kc.resourceAccess[key];
          const clientRoles = resourceAccess["roles"] || [];
          roles = roles.concat(clientRoles);
        }
      }
    }
    if (allRoles && this.kc.realmAccess) {
      const realmRoles = this.kc.realmAccess["roles"] || [];
      roles.push(...realmRoles);
    }
    return roles;
  }
}
