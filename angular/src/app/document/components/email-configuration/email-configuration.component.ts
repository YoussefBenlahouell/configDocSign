import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { numbers } from "@material/toolbar";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { BooleanLiteral } from "typescript";
import { DocumentSign } from "../../models/documentSign";
import { Mail } from "../../models/mail";
import { Placeholder } from "../../models/placeholder";
import { placeholderlist } from "../../models/placeholders";
import { Template } from "../../models/template";
import { ChangeInfoService } from "../../services/change-info.service";
import { DocumentSignService } from "../../services/document-sign.service";
import { MailService } from "../../services/mail.service";
import { PlaceholderService } from "../../services/placeholder.service";
import { TemplateService } from "../../services/template.service";

@Component({
  selector: "app-email-configuration",
  templateUrl: "./email-configuration.component.html",
  styleUrls: ["./email-configuration.component.scss"],
})
export class EmailConfigurationComponent implements OnInit {
  expirtation: boolean = false;
  @Output() deletei = new EventEmitter<number>();
  template;
  placerholders: Placeholder[];
  @Output() mailoutput = new EventEmitter<Mail>();
  reminder: Boolean = false;
  closeResult: string;
  mail: Mail;
  idTemplate;
  istermine = false;
  nbrDay: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  checkoutForm = this.formBuilder.group({
    idMail: null,
    subjectMail: null,
    messageMail: null,
    reminderEnabled: null,
    reminderDelay: null,
  });
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private documentSignService: DocumentSignService,
    private templateService: TemplateService,
    private changeInfoService: ChangeInfoService,
    private mailservice: MailService,
    private tokenService: KeyclockSecurityService
  ) {}
  Rexpirationchange() {
    this.expirtation = !this.expirtation;
  }
  ngOnInit(): void {
    console.log(this.nbrDay);
    this.mail = this.changeInfoService.mail;
    this.placerholders = this.changeInfoService.placeholders;
    this.placerholders.forEach((x) => {
      x.idPlaceholderBack = null;
    });
    this.checkoutForm.setValue({
      idMail: this.mail.idMail,
      subjectMail: this.mail.subjectMail,
      messageMail: this.mail.messageMail,
      reminderEnabled: this.mail.reminderEnabled,
      reminderDelay: this.mail.reminderDelay,
    });
  }

  prior() {
    this.deletei.emit(1);
  }
  Reminderchange() {
    this.reminder = !this.reminder;
  }

  saveTemplate() {
    let pdf = this.changeInfoService.takePdf();
    pdf.id = null;
    let placeholderWithNameNull: Placeholder[] = this.placerholders;

    placeholderWithNameNull.forEach((x) => {
      x.nameRecipient = null;
      x.emailRecipient = null;
    });

    this.template = new Template(
      null,
      "yassine,ojufiojdfiojdf",
      null,
      null,
      null,
      pdf,
      null,
      this.mail,
      placeholderWithNameNull,
      this.tokenService.kc.idTokenParsed.sub,
      false,
      this.changeInfoService.typeofSend
    );

    console.log(this.template);
    this;
    this.templateService.addTemplate(this.template).subscribe((x: Template) => {
      console.log(x);
      this.idTemplate = x.idTemplate;
    });
  }
  startSign() {
    {
      let pdf = this.changeInfoService.takePdf();
      pdf.id = null;
      let docsign = new DocumentSign(
        null,
        this.tokenService.kc.idTokenParsed.sub,
        null,
        this.changeInfoService.pdfUplodedList[0].name,
        "descirptiondocument",
        null,
        pdf,
        null,
        this.mail,
        this.placerholders,
        true,
        this.changeInfoService.typeofSend,
        true,
        null,
        "send"
      );

      this.istermine = true;
      console.log(docsign);

      this.documentSignService
        .addDocumentSign(docsign)
        .subscribe((x: DocumentSign) => {
          console.log(x);
        });
    }
  }
  onSubmit(content) {
    this.mail = this.checkoutForm.value;
    this.mail.reminderDelay = parseInt(this.checkoutForm.value.reminderDelay);
    // this.checkoutForm.reset();
    this.mail.idMail = null;
    this.modalService.open(content).result.then();
    this.changeInfoService.mail = this.mail;
  }
}
