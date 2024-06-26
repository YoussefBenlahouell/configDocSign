import { Injectable } from "@angular/core";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class ChangeinfoService {
  Imageurl = "";
  constructor(private userservice: UserService) {}
}
