import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { imageforupdate, imageforupdateOrg } from "../models/imageupdate";
import { organization } from "../models/organization";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userPostUrl = "http://127.0.0.1:8180/auth";
  constructor(private http: HttpClient) {}

  addnewUser(newUser: User) {
    console.log(JSON.parse(JSON.stringify(newUser)));
    return this.http.post(
      "http://localhost:9999/user-service/user/savewithmail/",
      JSON.parse(JSON.stringify(newUser))
    );
  }
  getUserFromBackById(iduser): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:9999/user-service/user/${iduser}`
    );
  }
  editUser(newUser: User) {
    console.log(JSON.parse(JSON.stringify(newUser)));
    return this.http.put(
      "http://localhost:9999/user-service/user/update",
      JSON.parse(JSON.stringify(newUser))
    );
  }
  editOrg(org: organization) {
    console.log(JSON.parse(JSON.stringify(org)));
    return this.http.put(
      "http://localhost:9999/user-service/api/organization/",
      JSON.parse(JSON.stringify(org))
    );
  }

  getUsersFromBack(idOrg: string): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:9999/user-service/user/userofOrg/${idOrg}`
    );
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
      `${this.userPostUrl}/admin/realms/ms-realm/users`,
      body,
      {
        headers: headers,
      }
    );
  }

  play(idUser: string): Observable<any> {
    return this.http.put(
      "http://localhost:9999/user-service/user/play",
      idUser
    );
  }

  updateimage(url: string, idUser: string): Observable<any> {
    const form: imageforupdate = new imageforupdate(idUser, url);
    return this.http.put(
      "http://localhost:9999/user-service/user/updateimage",
      form
    );
  }
  updateimageOrg(url: string, idOrg: string): Observable<any> {
    const form: imageforupdateOrg = new imageforupdateOrg(idOrg, url);
    return this.http.put(
      "http://localhost:9999/user-service/api/organization/updateimage",
      form
    );
  }

  pause(idUser: string): Observable<any> {
    return this.http.put(
      "http://localhost:9999/user-service/user/pause",
      idUser
    );
  }
  getadmin(idadmin: string): Observable<any> {
    return this.http.get(`http://localhost:9999/user-service/user/${idadmin}`);
  }

  public getuserfromkeyclock(token: any, iduser: string): Observable<any> {
    const body = { title: "Angular PUT Request Example" };

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.get<any>(
      `${this.userPostUrl}/admin/realms/ms-realm/users/${iduser}`,
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
      `${this.userPostUrl}/admin/realms/ms-realm/users/${iduser}`,
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
    let id: string = "";
    let name: string = "";
    if (isadmin) {
      (id = "feff9764-65b9-401d-b8bc-fe17aed2d2c6"), (name = "ADMIN");
    } else {
      (id = "d57345f9-e90e-4d20-8a80-00e06bb972a7"), (name = "MEMBER");
    }

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
    console.log(idUser);

  return this.http.post(
    `${this.userPostUrl}/admin/realms/ms-realm/users/${idUser}/role-mappings/realm`,
    body,
    {
      headers: headers,
    }
  );
  }
  /*
  public addRoletoUser(
    idUser: string,
    token: string,
    id: boolean
  ): Observable<any> {
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
  }*/
  getorgbyiduser(idadmin: string): Observable<any> {
    return this.http.get(
      `http://localhost:9999/user-service/user/org/${idadmin}`
    );
  }
}
