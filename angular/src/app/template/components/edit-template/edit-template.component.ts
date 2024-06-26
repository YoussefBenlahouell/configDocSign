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
  selector: "app-edit-template",
  templateUrl: "./edit-template.component.html",
  styleUrls: ["./edit-template.component.sass"],
})
export class EditTemplateComponent implements OnInit {
  i: number = 0;
  istermine = false;

  //pdfUplodedListId: String[] = [];
  pdf: any;

  constructor(
    private route: ActivatedRoute,
    private changeInfoService: ChangeInfoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.changeInfoService.setIdTemplate(params["id"]);
    });
  }
  prior($event) {
    this.i = this.i - 1;
  }
  next($event) {
    this.i = this.i + 1;
  }
}
