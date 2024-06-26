import { Component, OnInit } from "@angular/core";
import { User } from "src/app/dashbord/models/user";
import { ChangeinfoService } from "src/app/dashbord/services/changeinfo.service";
import { UserService } from "src/app/dashbord/services/user.service";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";

import { ThemeOptions } from "../../../../../theme-options";

@Component({
  selector: "app-user-box",
  templateUrl: "./user-box.component.html",
})
export class UserBoxComponent implements OnInit {
  user: User;
  Role: any;
  url =
    "https://res.cloudinary.com/signatury/image/upload/v1655103009/lztw4wpqzip0fwxiiy7h.png";
  constructor(
    private userservice: UserService,
    public globals: ThemeOptions,
    public securityservice: KeyclockSecurityService
  ) {}

  ngOnInit() {
    this.userservice
      .getUserFromBackById(this.securityservice.kc.idTokenParsed.sub)
      .subscribe(
        (x: any) => {
          this.user = x;
          this.url = x.imageprofileUser;
          console.log(x);
        },
        (err) => console.log(err)
      );
    if (
      this.securityservice.kc.tokenParsed.realm_access.roles.includes("ADMIN")
    )
      this.Role = "Admin";
    else if (
      this.securityservice.kc.tokenParsed.realm_access.roles.includes("MEMBER")
    )
      this.Role = "User";
  }
  onlogout() {
    this.securityservice.kc.logout({
      redirectUri: "http://localhost:4200/welcome",
    });
  }
  test() {
    let email = this.securityservice.kc.tokenParsed.realm_access.roles;
    console.log(email);
  }
  editpassword() {
    console.log("ccccc");
  }
}
