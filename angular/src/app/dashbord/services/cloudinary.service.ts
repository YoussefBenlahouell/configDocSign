import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}

  addimage(form: any) {
    console.log("édsds");
    return this.http.post(
      "http://api.cloudinary.com/v1_1/signatury/upload/",
      form
    );
  }
}
