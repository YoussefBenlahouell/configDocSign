import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentSign } from "../models/documentSign";
import { Template } from "../models/template";

@Injectable({
  providedIn: "root",
})
export class DocumentSignService {
  url = "http://localhost:9999/document-service/documents/";

  constructor(private http: HttpClient) {}

  getDocumentSigns(): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(this.url);
  }

  getDocumentSignById(id: string): Observable<DocumentSign> {
    return this.http.get<DocumentSign>(this.url + id + "/");
  }
  editDocumentSign(documentSign: DocumentSign): Observable<any> {
    return this.http.put(this.url, documentSign);
  }

  deleteDocumentSign(id: String): Observable<any> {
    const url = `${this.url}${id}/`;

    return this.http.delete(url);
  }
  copyDocumentSign(docsign: DocumentSign) {
    return this.http.post(this.url + "/new", docsign);
  }
  addDocumentSign(documentSign: DocumentSign) {
    return this.http.post(this.url, documentSign);
  }

  getDocumentsSharedWithMe(idUser: String): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(
      this.url + "sharedwithme/" + idUser + "/"
    );
  }
  getDocumentsCreatedAndSharedWithMe(
    idUser: String
  ): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(
      this.url + "createdsharedwithme/" + idUser + "/"
    );
  }
  getDocumentsCreatedByMe(idUser: String): Observable<DocumentSign[]> {
    return this.http.get<DocumentSign[]>(
      this.url + "createdbyme/" + idUser + "/"
    );
  }

  getDocumentByIdforchange(id: string): Observable<DocumentSign> {
    return this.http.get<DocumentSign>(this.url + "new/" + id + "/");
  }

  addShareWith(sharewith) {
    return this.http.post(
      "http://localhost:9999/document-service/sharedocument",
      sharewith
    );
  }
}
