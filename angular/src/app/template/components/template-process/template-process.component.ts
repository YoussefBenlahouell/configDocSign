import { ConstantPool } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { TokenStorageService } from "src/app/user/services/token-storage.service";
import { Document } from "../../models/document";
import { Mail } from "../../models/mail";
import { Placeholder } from "../../models/placeholder";

import { Template } from "../../models/template";
import { ChangeInfoService } from "../../services/change-info.service";
import { MailService } from "../../services/mail.service";
import { PlaceholderService } from "../../services/placeholder.service";
import { TemplateService } from "../../services/template.service";

@Component({
  selector: "app-template-process",
  templateUrl: "./template-process.component.html",
  styleUrls: ["./template-process.component.css"],
})
export class TemplateProcessComponent implements OnInit {
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  searchText;
  heading = "Model Creation ";
  subheading = " ";
  i: number = 0;

  constructor(
    private tokenService: KeyclockSecurityService,
    //private placeholderservice: PlaceholderService,
    private templateService: TemplateService,
    private changeInfoService: ChangeInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.changeInfoService.startFromZero();
  }
  prior($event) {
    this.i = this.i - 1;
  }
  next($event) {
    this.i = this.i + 1;
  }

  onTermine($event) {}
  testget() {
    this.templateService.getTemplates().subscribe((x) => console.log(x));
    console.log("1");
  }
  getTemplatesSharedWithMe() {
    this.templateService
      .getTemplatesSharedWithMe(this.tokenService.kc.idTokenParsed.sub)
      .subscribe((x) => console.log(x));
    console.log("2");
  }
  getTemplatesCreatedByMe() {
    this.templateService
      .getTemplatesCreatedByMe(this.tokenService.kc.idTokenParsed.sub)
      .subscribe((x) => console.log(x));
    console.log("3");
  }
}
