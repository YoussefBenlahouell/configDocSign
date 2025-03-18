import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Mail } from "../models/mail";

@Injectable({
  providedIn: "root",
})
export class MailService {
  apiBaseUrl = ""; // Base URL vide pour NGINX (http://localhost:80)
  url = `${this.apiBaseUrl}/filees/mails/`; // Chemin relatif

  constructor(private http: HttpClient) {}

  getMails(): Observable<Mail[]> {
    return this.http.get<Mail[]>(this.url);
  }

  getMailById(id: string): Observable<Mail> {
    return this.http.get<Mail>(`${this.url}${id}/`);
  }

  editMail(mail: Mail): Observable<any> {
    return this.http.put(this.url, mail);
  }

  deleteMail(id: string): Observable<any> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url);
  }

  addMail(mail: Mail) {
    return this.http.post(this.url, mail);
  }
}