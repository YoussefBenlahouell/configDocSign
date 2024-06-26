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

  getTemplateById(id: string): Observable<Template> {
    return this.http.get<Template>(this.url + id + "/");
  }
  getTemplateByIdforchange(id: string): Observable<Template> {
    return this.http.get<Template>(this.url + "new/" + id + "/");
  }
  editTemplate(template: Template): Observable<any> {
    return this.http.put(this.url, template);
  }

  deleteTemplate(id: String): Observable<any> {
    const url = `${this.url}${id}/`;

    return this.http.delete(url);
  }

  addTemplate(template: Template) {
    return this.http.post(this.url, template);
  }
}
