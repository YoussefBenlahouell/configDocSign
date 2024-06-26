import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FolderDocService {
  constructor(private http: HttpClient) {}

  getFolderbyidowner(idUser: String): Observable<any[]> {
    return this.http.get<any[]>(
      "http://localhost:9999/document-service/docfolders/" + idUser
    );
  }
}
