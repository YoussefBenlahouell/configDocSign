import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SigneService {
  url = "http://localhost:9999/document-service/documents/";

  constructor(private http: HttpClient) {}

  statutConsulteDocumentSign(idDoc: string, token: any): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.put(this.url + "change/consulte/" + idDoc, {
      headers: headers,
    });
  }
  statutRejectedDocumentSign(documentSign: any, token: any): Observable<any> {
    const body = { documentSign };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.put(this.url + "change/rejected/", body, httpOptions);
  }

  statutSignDocumentSign(documentSign: any, token: any): Observable<any> {
    const body = { documentSign };

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };

    return this.http.put(
      "http://localhost:9999/document-service/documents/change/sign",

      body,
      httpOptions
    );
  }

  getDocumentSignById(id: string, token: any): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get<any>(
      "http://localhost:9999/document-service/documents/forsigner/" + id,
      {
        headers: headers,
      }
    );
  }
}
