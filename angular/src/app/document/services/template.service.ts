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

  getTemplateById(id: string): Observable<Template> {
    return this.http.get<Template>(`${this.url}${id}/`);
  }

  getTemplateByIdforchange(id: string): Observable<Template> {
    return this.http.get<Template>(`${this.url}new/${id}/`);
  }

  editTemplate(template: Template): Observable<any> {
    return this.http.put(this.url, template);
  }

  deleteTemplate(id: string): Observable<any> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url);
  }

  addTemplate(template: Template) {
    return this.http.post(this.url, template);
  }
}