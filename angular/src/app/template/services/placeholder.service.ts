import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlaceholderService {
  apiBaseUrl = ""; // Base URL vide pour NGINX (http://localhost:80)
  url = `${this.apiBaseUrl}/templates/placeholders/`; // Chemin relatif

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  getPlaceholders(): Observable<Placeholder[]> {
    return this.http.get<Placeholder[]>(this.url);
  }

  getPlaceholderById(id: string): Observable<Placeholder> {
    return this.http.get<Placeholder>(`${this.url}${id}/`);
  }

  editPlaceholder(placeholder: Placeholder): Observable<any> {
    return this.http.put(this.url, placeholder, this.httpOptions);
  }

  deletePlaceholder(id: string): Observable<any> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url);
  }

  addPlaceholder(placeholder: any) {
    console.log(placeholder);
    return this.http.post(this.url, placeholder);
  }
}