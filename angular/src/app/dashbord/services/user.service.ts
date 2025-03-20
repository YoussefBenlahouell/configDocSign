import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { imageforupdate, imageforupdateOrg } from "../models/imageupdate";
import { organization } from "../models/organization";
import { User } from "../models/user";
import * as url from "url";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userPostUrl = "http://127.0.0.1:8180/auth"; // URL Keycloak reste inchangée
  apiBaseUrl = ""; // Base URL vide pour utiliser NGINX (http://localhost:80)

  constructor(private http: HttpClient) {}

  addnewUser(newUser: User) {
    console.log(JSON.parse(JSON.stringify(newUser)));
    return this.http.post(
        `${this.apiBaseUrl}/user/savewithmail/`, // Modifié
        JSON.parse(JSON.stringify(newUser))
    );
  }

  getUserFromBackById(iduser): Observable<User[]> {
    console.log("Requesting user with ID:", iduser, "URL:", url);
    return this.http.get<User>(`${this.apiBaseUrl}/user/${iduser}`); // Modifié
  }

  editUser(newUser: User) {
    console.log(JSON.parse(JSON.stringify(newUser)));
    return this.http.put(
        `${this.apiBaseUrl}/user/update`, // Modifié
        JSON.parse(JSON.stringify(newUser))
    );
  }

  editOrg(org: organization) {
    console.log(JSON.parse(JSON.stringify(org)));
    return this.http.put(
        `${this.apiBaseUrl}/user/api/organization/`, // Modifié
        JSON.parse(JSON.stringify(org))
    );
  }

  getUsersFromBack(idOrg: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/user/userofOrg/${idOrg}`); // Modifié
  }

  public addUserWithPasswordInKeyclockwithmailForchangeMotdepasse(
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
      emailVerified: true,
      enabled: true,
      groups: [org],
      credentials: [
        {
          type: "password",
          value: newUser.fnameUser + newUser.lnameUser,
          temporary: false,
        },
      ],
      realmRoles: ["MEMBER"],
    });
    console.log(body);

    return this.http.post(
        `${this.userPostUrl}/admin/realms/ms-realm/users`, // Keycloak, inchangé
        body,
        {
          headers: headers,
        }
    );
  }

  play(idUser: string): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/user/play`, idUser); // Modifié
  }

  updateimage(url: string, idUser: string): Observable<any> {
    const form: imageforupdate = new imageforupdate(idUser, url);
    return this.http.put(`${this.apiBaseUrl}/user/updateimage`, form); // Modifié
  }

  updateimageOrg(url: string, idOrg: string): Observable<any> {
    const form: imageforupdateOrg = new imageforupdateOrg(idOrg, url);
    return this.http.put(
        `${this.apiBaseUrl}/user/api/organization/updateimage`, // Modifié
        form
    );
  }

  pause(idUser: string): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/user/pause`, idUser); // Modifié
  }

  getadmin(idadmin: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/${idadmin}`); // Modifié
  }

  public getuserfromkeyclock(token: any, iduser: string): Observable<any> {
    const body = { title: "Angular PUT Request Example" };

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.get<any>(
        `${this.userPostUrl}/admin/realms/ms-realm/users/${iduser}`, // Keycloak, inchangé
        httpOptions
    );
  }

  public changestatusUserinKeyclock(
      token: any,
      iduser: string,
      user: any,
      status: boolean
  ): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const body = JSON.stringify({ enabled: status });
    console.log("body");
    console.log(body);

    return this.http.put<any>(
        `${this.userPostUrl}/admin/realms/ms-realm/users/${iduser}`, // Keycloak, inchangé
        body,
        {
          headers: headers,
        }
    );
  }

  public addRoletoUser(
      idUser: string,
      token: string,
      isadmin: boolean
  ): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify(
        isadmin
            ? [
              {
                id: "feff9764-65b9-401d-b8bc-fe17aed2d2c6",
                name: "ADMIN",
              },
            ]
            : [
              {
                id: "d57345f9-e90e-4d20-8a80-00e06bb972a7",
                name: "MEMBER",
              },
            ]
    );
    console.log(idUser);

    return this.http.post(
        `${this.userPostUrl}/admin/realms/ms-realm/users/${idUser}/role-mappings/realm`, // Keycloak, inchangé
        body,
        {
          headers: headers,
        }
    );
  }

  getorgbyiduser(idadmin: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/org/${idadmin}`); // Modifié
  }
}