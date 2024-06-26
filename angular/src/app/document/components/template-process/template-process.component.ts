import { Component, OnInit } from "@angular/core";
import { Mail } from "../../models/mail";
import { Placeholder } from "../../models/placeholder";
import { placeholderlist } from "../../models/placeholders";
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
  i: number = 0;
  istermine = false;
  template: Template;
  idMail: string = "";
  idTemplate = "";
  //pdfUplodedListId: String[] = [];
  pdf: any;
  constructor(
    private placeholderservice: PlaceholderService,
    private templateService: TemplateService,
    private changeInfoService: ChangeInfoService,
    private mailservice: MailService
  ) {}

  ngOnInit(): void {
    this.changeInfoService.startFromZero();
  }
  prior($event) {
    this.i = this.i - 1;
  }
  next($event) {
    this.i = this.i + 1;
  }

  onTermine($event) {}
}
