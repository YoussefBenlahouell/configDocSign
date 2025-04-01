import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FolderDocService {
  apiBaseUrl = ""; // Base URL vide pour NGINX (http://angular.signatury.com)

  constructor(private http: HttpClient) {}

  getFolderbyidowner(idUser: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/filees/docfolders/${idUser}`);
  }
}