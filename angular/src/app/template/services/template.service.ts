import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Template } from "../models/template";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  url = "http://localhost:9999/template-service/templates/";

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(this.url);
  }

  getFolderbyidowner(idUser: String): Observable<any[]> {
    return this.http.get<any[]>(
      "http://localhost:9999/template-service/templates/" + idUser
    );
  }

  getTemplatesSharedWithMe(idUser: String): Observable<Template[]> {
    return this.http.get<Template[]>(this.url + "sharedwithme/" + idUser + "/");
  }
  getTemplatesCreatedAndSharedWithMe(idUser: String): Observable<Template[]> {
    return this.http.get<Template[]>(
      this.url + "createdsharedwithme/" + idUser + "/"
    );
  }
  getTemplatesCreatedByMe(idUser: String): Observable<Template[]> {
    return this.http.get<Template[]>(this.url + "createdbyme/" + idUser + "/");
  }
  getTemplateById(id: string): Observable<Template> {
    return this.http.get<Template>(this.url + id + "/");
  }
  editTemplate(template: Template): Observable<any> {
    return this.http.put(this.url, template);
  }

  deleteTemplate(id: String): Observable<any> {
    const url = `${this.url}${id}/`;

    return this.http.delete(url);
  }

  copyTemplate(template: Template) {
    return this.http.post(this.url + "/new", template);
  }

  addTemplate(template: Template) {
    return this.http.post(this.url, template);
  }
  getTemplateByIdforchange(id: string): Observable<Template> {
    return this.http.get<Template>(this.url + "new/" + id + "/");
  }
  addShareWith(sharewith) {
    return this.http.post(
      "http://localhost:9999/template-service/sharetemplate",
      sharewith
    );
  }
}
