import { Component } from "@angular/core";
import { KeyclockSecurityService } from "./services/keyclock-security.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(public securityservice: KeyclockSecurityService) {}
}
