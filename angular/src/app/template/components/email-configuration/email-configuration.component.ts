import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { numbers } from "@material/toolbar";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { BooleanLiteral } from "typescript";

import { Mail } from "../../models/mail";
import { Placeholder } from "../../models/placeholder";
import { Template } from "../../models/template";
import { ChangeInfoService } from "../../services/change-info.service";
import { MailService } from "../../services/mail.service";
import { TemplateService } from "../../services/template.service";

@Component({
  selector: "app-email-configuration",
  templateUrl: "./email-configuration.component.html",
  styleUrls: ["./email-configuration.component.scss"],
})
export class EmailConfigurationComponent implements OnInit {
  checkoutForm2 = this.formBuilder.group({
    descTemplate: null,
    nameTemplate: null,
  });

  expirtation: boolean = false;
  isedit: boolean = false;
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
    exprationEnabled: null,
    exprationDelay: null,
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,

    private templateService: TemplateService,
    private changeInfoService: ChangeInfoService,
    private mailservice: MailService,
    private tokenService: KeyclockSecurityService
  ) {}

  ngOnInit(): void {
    this.isedit = this.changeInfoService.isedit;
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
      exprationEnabled: this.mail.exprationEnabled,
      exprationDelay: this.mail.exprationDelay,
    });
  }

  prior() {
    this.deletei.emit(1);
  }
  Rexpirationchange() {
    this.expirtation = !this.expirtation;
  }
  Reminderchange() {
    this.reminder = !this.reminder;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  editTemplate() {}
  savenewTemplate() {
    if (this.isedit) {
      let tem: Template = this.changeInfoService.template;
      tem.typeofSend = this.changeInfoService.typeofSend;
      tem.filePdf = this.changeInfoService.pdfUplodedList[0];
      tem.mail;
      tem.placeholders = this.placerholders;
      tem.lastChangeDateTemplate = null;
      tem.nameTemplate = this.checkoutForm2.value.nameTemplate;
      tem.descTemplate = this.checkoutForm2.value.descTemplate;
      console.log(tem);
      this.templateService.editTemplate(tem).subscribe(
        (x: Template) => {
          console.log(x);
          this.idTemplate = x.idTemplate;
        },
        (err) => console.log(err),
        () => {
          this.router.navigate(["dashbord/template/alltemplate"]).then();
        }
      );
    } else {
      console.log(this.checkoutForm2.value);
      let pdf = this.changeInfoService.takePdf();
      pdf.id = null;
      let placeholderWithNameNull: Placeholder[] = this.placerholders;

      placeholderWithNameNull.forEach((x) => {
        x.nameRecipient = null;
        x.emailRecipient = null;
      });
      this.template = new Template(
        null,
        this.checkoutForm2.value.nameTemplate,
        this.checkoutForm2.value.descTemplate,
        null,
        null,
        pdf,
        null,
        this.mail,
        placeholderWithNameNull,
        this.tokenService.kc.idTokenParsed.sub,
        false,
        this.changeInfoService.typeofSend,
        null
      );

      this.templateService.addTemplate(this.template).subscribe(
        (x: any) => {
          console.log(x);
          this.idTemplate = x.idTemplate;
        },
        (err) => console.log(err),
        () => {
          this.router.navigate(["dashbord/template/alltemplate"]).then();
        }
      );
    }
  }

  onSubmit(content) {
    this.mail = this.checkoutForm.value;
    this.mail.reminderDelay = parseInt(this.checkoutForm.value.reminderDelay);
    // this.checkoutForm.reset();
    this.mail.idMail = null;
    this.modalService.open(content).result.then();
    this.changeInfoService.mail = this.mail;

    this.checkoutForm2.setValue({
      descTemplate: this.changeInfoService.template.descTemplate,
      nameTemplate: this.changeInfoService.template.nameTemplate,
    });
  }
}

/*
export class EmailConfigurationComponent implements OnInit {
  @Output() deletei = new EventEmitter<number>();
  @Output() save = new EventEmitter<boolean>();
  @Output() mailoutput = new EventEmitter<Mail>();
  reminder: Boolean = false;
  closeResult: string;
  mail: Mail;

  template;
  placerholders: Placeholder[];

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.nbrDay);
  }

  prior() {
    this.deletei.emit(1);
  }
  Reminderchange() {
    this.reminder = !this.reminder;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  saveAll() {
    console.log("terminééééééééééé email ");
    this.mailoutput.emit(this.mail);
    this.save.emit(true);
    console.log(this.mail);
    console.log(typeof this.nbrDay[1]);
  }
  onSubmit(content) {
    this.mail = this.checkoutForm.value;
    this.mail.reminderDelay = parseInt(this.checkoutForm.value.reminderDelay);
    // this.checkoutForm.reset();
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
}
*/
