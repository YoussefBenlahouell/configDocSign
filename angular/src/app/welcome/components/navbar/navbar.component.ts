import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    public securityservice: KeyclockSecurityService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit(): void {}
  onSignin() {
    this.securityservice.kc.login({
      redirectUri: "http://localhost:4200/dashbord",
    });
  }
  onSignup() {
    this.route.navigate(["/http://localhost:4200/user/signuptest"]);
  }
}
