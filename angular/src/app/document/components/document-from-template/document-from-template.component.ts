import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Mail } from "../../models/mail";
import { Placeholder } from "../../models/placeholder";
import { placeholderlist } from "../../models/placeholders";
import { Template } from "../../models/template";
import { ChangeInfoService } from "../../services/change-info.service";
import { MailService } from "../../services/mail.service";
import { PlaceholderService } from "../../services/placeholder.service";
import { TemplateService } from "../../services/template.service";

@Component({
  selector: "app-document-from-template",
  templateUrl: "./document-from-template.component.html",
  styleUrls: ["./document-from-template.component.sass"],
})
export class DocumentFromTemplateComponent implements OnInit {
  i: number = 0;
  istermine = false;
  template: Template;
  idMail: string = "";

  //pdfUplodedListId: String[] = [];
  pdf: any;

  constructor(
    private placeholderservice: PlaceholderService,
    private templateService: TemplateService,
    private changeInfoService: ChangeInfoService,
    private mailservice: MailService,
    private route: ActivatedRoute
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

  onTermine($event) {}
}
