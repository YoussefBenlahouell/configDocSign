import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentSign } from "src/app/document/models/documentSign";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";

@Injectable({
  providedIn: "root",
})
export class UploadServiceService {
  private apiBaseUrl = ""; // Base URL vide pour NGINX (http://localhost:80)
  private baseUrl = `${this.apiBaseUrl}/filees`; // Chemin relatif

  constructor(
      private http: HttpClient,
      private tokenservice: KeyclockSecurityService
  ) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest("POST", `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: "json",
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.tokenservice.kc.token,
      }),
    };
    return this.http.get(`${this.baseUrl}/files`, httpOptions);
  }

  delete(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest("DELETE", `${this.baseUrl}/delete/${id}`);
    return this.http.request(req);
  }

  getFile(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.tokenservice.kc.token,
      }),
    };
    return this.http.get(`${this.baseUrl}/files/${id}`, httpOptions);
  }

  getDocumentSignById(id: string, token: any): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return this.http.get<DocumentSign>(
        `${this.baseUrl}/documents/forsigner/${id}`,
        { headers }
    );
  }
}