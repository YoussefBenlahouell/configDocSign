import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Template } from "../models/template";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  apiBaseUrl = ""; // Base URL vide pour NGINX (http://localhost:80)
  url = `${this.apiBaseUrl}/templates/`; // Chemin relatif

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(this.url);
  }

  getFolderbyidowner(idUser: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}${idUser}`);
  }

  getTemplatesSharedWithMe(idUser: string): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.url}sharedwithme/${idUser}/`);
  }

  getTemplatesCreatedAndSharedWithMe(idUser: string): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.url}createdsharedwithme/${idUser}/`);
  }

  getTemplatesCreatedByMe(idUser: string): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.url}createdbyme/${idUser}/`);
  }

  getTemplateById(id: string): Observable<Template> {
    return this.http.get<Template>(`${this.url}${id}/`);
  }

  editTemplate(template: Template): Observable<any> {
    return this.http.put(this.url, template);
  }

  deleteTemplate(id: string): Observable<any> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url);
  }

  copyTemplate(template: Template) {
    return this.http.post(`${this.url}new`, template);
  }

  addTemplate(template: Template) {
    return this.http.post(this.url, template);
  }

  getTemplateByIdforchange(id: string): Observable<Template> {
    return this.http.get<Template>(`${this.url}new/${id}/`);
  }

  addShareWith(sharewith) {
    return this.http.post(`${this.apiBaseUrl}/templates/sharetemplate`, sharewith);
  }
}