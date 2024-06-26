import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Document } from "../models/document";
import { Mail } from "../models/mail";
import { Placeholder } from "../models/placeholder";
import { Template } from "../models/template";
import { TemplateService } from "./template.service";
import * as uuid from "uuid";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Injectable({
  providedIn: "root",
})
export class ChangeInfoService {
  isedit: boolean = false;
  typeofSend: string;
  pdfUplodedList: any[] = [];
  template: Template;
  mail: Mail;
  document: Document;
  placeholders: Placeholder[];
  file: any[] = [];
  constructor(
    private http: HttpClient,
    private templateService: TemplateService
  ) {}
  startFromZero() {
    this.typeofSend = "serial";
    this.isedit = false;
    this.pdfUplodedList = [];
    this.mail = new Mail(
      null,
      "electronic signature request",
      "you need to this Document",
      false,
      0,
      false,
      0
    );
    this.placeholders = [
      {
        idPlaceholderBack: null,
        idPlaceholder: uuid.v4(),
        namePlaceholder: null,
        colorPlaceholder:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
          "7F",
        typePlaceholder: "needSign",
        elements: [],
        template: null,
        nameRecipient: null,
        emailRecipient: null,
        orderPlaceholder: null,
        isvisible: true,
      },
    ];
  }

  takePdf(): Document {
    return this.pdfUplodedList[0];
  }

  addPdf(pdfInfo: Document) {
    this.pdfUplodedList.push(pdfInfo);
  }
  deletePdf(index) {
    this.pdfUplodedList.splice(index, 1);
  }
  setIdTemplate(id: string) {
    this.isedit = true;
    this.pdfUplodedList = [];
    this.placeholders = [];
    this.templateService
      .getTemplateByIdforchange(id)
      .subscribe((template: Template) => {
        this.template = template;
        this.placeholders = template.placeholders;
        this.pdfUplodedList.push(template.filePdf);
        this.mail = template.mail;
        this.typeofSend = template.typeofSend;
      });
  }
}
