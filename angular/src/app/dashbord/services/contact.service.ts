import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "../models/contact";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  url = "http://localhost:9999/user-service/contacts/";

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.url + id + "/");
  }
  editContact(contact: Contact): Observable<any> {
    return this.http.put(this.url, contact);
  }

  deleteContact(id: number): Observable<any> {
    const url = `${this.url}${id}/`;

    return this.http.delete(url);
  }

  addContact(contact: Contact) {
    return this.http.post(this.url, contact);
  }

  getContactCreatedByMe(idUser: String): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + "createdbyme/" + idUser + "/");
  }
}
