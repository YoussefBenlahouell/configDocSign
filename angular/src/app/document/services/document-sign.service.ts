import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentSign } from "../models/documentSign";

@Injectable({
  providedIn: "root",
})
export class DocumentSignService {
  apiBaseUrl = ""; // Base URL vide pour NGINX (http://localhost:80)
  url = `${this.apiBaseUrl}/filees/documents/`; // Chemin relatif

  constructor(private http: HttpClient) {}

  getDocumentSigns(): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(this.url);
  }

  getDocumentSignById(id: string): Observable<DocumentSign> {
    return this.http.get<DocumentSign>(`${this.url}${id}/`);
  }

  editDocumentSign(documentSign: DocumentSign): Observable<any> {
    return this.http.put(this.url, documentSign);
  }

  deleteDocumentSign(id: string): Observable<any> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url);
  }

  copyDocumentSign(docsign: DocumentSign) {
    return this.http.post(`${this.url}new`, docsign);
  }

  addDocumentSign(documentSign: DocumentSign) {
    return this.http.post(this.url, documentSign);
  }

  getDocumentsSharedWithMe(idUser: string): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(`${this.url}sharedwithme/${idUser}/`);
  }

  getDocumentsCreatedAndSharedWithMe(idUser: string): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(`${this.url}createdsharedwithme/${idUser}/`);
  }

  getDocumentsCreatedByMe(idUser: string): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(`${this.url}createdbyme/${idUser}/`);
  }

  getDocumentByIdforchange(id: string): Observable<DocumentSign> {
    return this.http.get<DocumentSign>(`${this.url}new/${id}/`);
  }

  addShareWith(sharewith) {
    return this.http.post(`${this.apiBaseUrl}/filees/sharedocument`, sharewith);
  }
}