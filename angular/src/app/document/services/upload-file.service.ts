import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
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
}