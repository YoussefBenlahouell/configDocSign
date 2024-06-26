import { LoginInfo } from "../models/loginInfo";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { User } from "../models/user";
import { filter, map } from "rxjs/operators";
import { catchError, retry } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class SiginupService {
  private userPostUrl: string;
  constructor(private http: HttpClient) {
    this.userPostUrl = "http://127.0.0.1:8180/auth";
  }

  public tokenUsersign(user: LoginInfo): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        client_id: "angular-client",
        username: user.email,
        password: user.password,
        grant_type: "password",
      },
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    console.log(params);
    return this.http.post(
      `${this.userPostUrl}/realms/ms-realm/protocol/openid-connect/token`,
      params.toString(),
      httpOptions
    );
  }

  public tokenUser(user: LoginInfo): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        client_id: "admin-cli",
        username: user.email,
        password: user.password,
        grant_type: "password",
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    console.log(params);
    return this.http.post(
      `${this.userPostUrl}/realms/ms-realm/protocol/openid-connect/token`,
      params.toString(),
      httpOptions
    );
  }

  public tokenadmin(): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username: "yassine.elj",
        password: "123456",
        grant_type: "password",
        client_id: "admin-cli",
      },
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    console.log(params);
    return this.http.post(
      `${this.userPostUrl}/realms/master/protocol/openid-connect/token`,
      params.toString(),
      httpOptions
    );
  }

  public changepassword(
    idUser: string,
    token: any,
    newpassword: string
  ): Observable<any> {
    const body = JSON.stringify({
      type: "password",
      value: newpassword,
      temporary: false,
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.put(
      `${this.userPostUrl}/admin/realms/ms-realm/users/${idUser}/reset-password`,
      body,
      httpOptions
    );
  }
  public findbyemail(token: any, email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.get(
      `${this.userPostUrl}/admin/realms/ms-realm/users/?email=${email}`,
      httpOptions
    );
  }
  public sendVerifyEmail(token: any, iduser: string): Observable<any> {
    const body = { title: "Angular PUT Request Example" };

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "PUT",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.put<any>(
      `${this.userPostUrl}/admin/realms/ms-realm/users/${iduser}/send-verify-email`,
      body,
      httpOptions
    );
  }

  public addUser(newUser: User, token: string): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify({
      firstName: newUser.fnameUser,
      lastName: newUser.lnameUser,
      email: newUser.emailUser,
      enabled: true,
      username: newUser.passwordUser,
    });
    console.log(body);

    return this.http.post(
      `${this.userPostUrl}/admin/realms/ms-realm/users`,
      body,
      {
        headers: headers,
      }
    );
  }

  public addRoletoUser(idUser: string, token: string): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify([
      {
        id: "feff9764-65b9-401d-b8bc-fe17aed2d2c6",
        name: "ADMIN",
      },
      {
        id: "d57345f9-e90e-4d20-8a80-00e06bb972a7",
        name: "MEMBER",
      },
    ]);
    console.log(body);

    return this.http.post(
      `${this.userPostUrl}/admin/realms/ms-realm/users/${idUser}/role-mappings/realm`,
      body,
      {
        headers: headers,
      }
    );
  }
  public addUserWithPasswordInKeyclock(
    newUser: User,
    token: string,
    org: string
  ): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify({
      firstName: newUser.fnameUser,
      lastName: newUser.lnameUser,
      email: newUser.emailUser,
      username: newUser.emailUser,
      emailVerified: false,
      groups: [org],
      enabled: true,
      credentials: [
        { type: "password", value: newUser.passwordUser, temporary: false },
      ],
      realmRoles: ["ADMIN", "MEMBER"],
    });
    console.log(body);

    return this.http.post(
      `${this.userPostUrl}/admin/realms/ms-realm/users`,
      body,
      {
        headers: headers,
      }
    );
  }

  public addUserWithPasswordInKeyclockForsign(
    email: string,
    token: string
  ): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify({
      firstName: "test",
      lastName: "test",
      email: email,
      username: email,
      emailVerified: true,
      enabled: true,
      credentials: [{ type: "password", value: "testtest", temporary: false }],
      realmRoles: ["MEMBER"],
    });
    console.log(body);

    return this.http.post(
      `${this.userPostUrl}/admin/realms/ms-realm/users`,
      body,
      {
        headers: headers,
      }
    );
  }

  public tokenUserforSign(email): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        client_id: "angular-client",
        //  client_secret: "e6f5e8GIHaFwBiM7cSWEsnan1cSHlVs0",
        username: email,
        password: "testtest",
        grant_type: "password",
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    console.log(params);
    return this.http.post(
      "http://keycloak:8080/auth/realms/ms-realm/protocol/openid-connect/token",
      params.toString(),
      httpOptions
    );
  }

  public addUserWithPasswordInDB(
    newUser: User,
    token: string
  ): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify(newUser);
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    console.log(body);

    return this.http.post("http://localhost:9999/user/", body);
  }

  addnewUser(newUser: User) {
    console.log(JSON.parse(JSON.stringify(newUser)));
    return this.http.post(
      "http://localhost:9999/user/",
      JSON.parse(JSON.stringify(newUser))
    );
  }

  getUsersFromBack(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9999/user-service/user/");
  }

  public postnewinitalacces(token: string): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify({
      count: 5,
      expiration: 5,
    });
    console.log(body);

    return this.http.post(
      "http://127.0.0.1:8180/auth/admin/realms/ms-realm/clients-initial-access",
      body,
      {
        headers: headers,
      }
    );
  }

  public creategroup(token: string, nameOrg: string): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify({
      name: nameOrg,
      path: "/" + nameOrg,
      subGroups: [],
    });
    console.log(body);

    return this.http.post(
      "http://127.0.0.1:8180/auth/admin/realms/ms-realm/groups",
      body,
      {
        headers: headers,
      }
    );
  }

  public getidgroupByname(token: string, nameOrg: string): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get(
      "http://127.0.0.1:8180/auth/admin/realms/ms-realm/groups",
      {
        headers: headers,
      }
    );
  }
}
