import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SigneService {
  apiBaseUrl = ""; // Base URL vide pour NGINX (http://localhost:80)
  url = `${this.apiBaseUrl}/filees/documents/`; // Chemin relatif

  constructor(private http: HttpClient) {}

  statutConsulteDocumentSign(idDoc: string, token: any): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.put(
        `${this.url}change/consulte/${idDoc}`,
        null,
        { headers }
    );
  }

  statutRejectedDocumentSign(documentSign: any, token: any): Observable<any> {
    const body = { documentSign };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.put(`${this.url}change/rejected/`, body, httpOptions);
  }

  statutSignDocumentSign(documentSign: any, token: any): Observable<any> {
    const body = { documentSign };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http.put(`${this.url}change/sign`, body, httpOptions);
  }

  getDocumentSignById(id: string, token: any): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get<any>(`${this.url}forsigner/${id}`, { headers });
  }
}