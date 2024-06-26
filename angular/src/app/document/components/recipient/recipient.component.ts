import { Component, OnInit } from "@angular/core";
import { Placeholder } from "../../models/placeholder";
import { placeholderlist } from "../../models/placeholders";
import { Output, EventEmitter } from "@angular/core";
import * as uuid from "uuid";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeInfoService } from "../../services/change-info.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContactService } from "../../services/contact.service";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { Contact } from "../../models/contact";
@Component({
  selector: "app-recipient",
  templateUrl: "./recipient.component.html",
  styleUrls: ["./recipient.component.css"],
})
export class RecipientComponent implements OnInit {
  constructor(
    private changeInfo: ChangeInfoService,
    private modalService: NgbModal,
    private contactService: ContactService,
    private tokenService: KeyclockSecurityService
  ) {}
  idrecipeintselected;
  pipeline = "parallel";
  isempty = false;
  placerholders: Placeholder[] = this.changeInfo.placeholders;
  //  @Output() addPlaceholderOut = new EventEmitter<Placeholder>();
  //  @Output() deletePlaceholderOut = new EventEmitter<number>();
  @Output() addi = new EventEmitter<number>();
  @Output() deletei = new EventEmitter<number>();
  ngOnInit(): void {
    // console.log(this.changeInfo.pdfUplodedList);
    this.pipeline = this.changeInfo.typeofSend;
    console.log(this.changeInfo.template);
  }
  closeResult;
  model;
  testplace() {}
  addRole() {
    const placeholder: Placeholder = {
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
      phoneRecipient: null,
      orgRecipient: null,
    };
    this.placerholders.push(placeholder);
    // this.addPlaceholderOut.emit(placeholder);
  }

  changetypepipeline(x) {
    this.pipeline = x;
  }
  changetypepipelineparalle() {}
  deleteRole(index: number) {
    this.placerholders.splice(index, 1);
    //  this.deletePlaceholderOut.emit(index);
  }
  valuechangeNamePlaceholder(placename, index) {
    this.placerholders[index].namePlaceholder = placename;
    console.log(placename);
  }
  valuechangeNameRecipient(placename, index) {
    this.placerholders[index].nameRecipient = placename;
    console.log(placename);
  }
  valuechangeEmailRecipient(placename, index) {
    this.placerholders[index].emailRecipient = placename;
    console.log(placename);
  }
  valuechangephonePlaceholder(placename, index) {
    this.placerholders[index].phoneRecipient = placename;
    console.log(placename);
  }
  valuechangeOrgRecipient(placename, index) {
    this.placerholders[index].orgRecipient = placename;
    console.log(placename);
  }
  prior() {
    this.deletei.emit(1);
    this.changeInfo.placeholders = this.placerholders;
  }
  next() {
    this.isempty = false;

    this.placerholders.forEach((e) => {
      console.log(e);
      if (e.namePlaceholder == null || e.namePlaceholder == "") {
        this.isempty = true;
      }
    });
    console.log(this.isempty);

    if (this.placerholders.length > 0 && !this.isempty) {
      let i: number = 0;
      this.placerholders.forEach((placeholder) => {
        i++;
        placeholder.orderPlaceholder = i;
      });
      console.log(this.placerholders);
      this.changeInfo.placeholders = this.placerholders;
      this.changeInfo.typeofSend = this.pipeline;
      this.addi.emit(1);
    }
  }

  radioChange(type, index) {
    this.placerholders[index].typePlaceholder = type;
    console.log(type);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.placerholders,
      event.previousIndex,
      event.currentIndex
    );
  }
  contactlist(content, id) {
    this.idrecipeintselected = id;
    console.log("xxx");

    this.model = this.modalService.open(content, { centered: true });
    this.getdata();
    this.cuurentidUser = this.tokenService.kc.idTokenParsed.sub;
  }
  choisecontact($event: Contact) {
    this.placerholders[this.idrecipeintselected].nameRecipient =
      $event.fullNameContact;
    this.placerholders[this.idrecipeintselected].phoneRecipient =
      $event.telContact;
    $event.emailContact;
    this.placerholders[this.idrecipeintselected].emailRecipient =
      $event.emailContact;
    this.placerholders[this.idrecipeintselected].orgRecipient =
      $event.companyContact;
    this.modalService;
    this.model.close();
  }

  public isActive: any;

  cuurentidUser: string = "";
  notforshowContact: Contact[] = [];
  contacts: Contact[] = [];
  selectedContact: Contact[];
  pageSize = 7;
  page = 1;
  contactforchange: Contact;

  lengthCHekedList: number = 0;

  masterSelected: boolean = true;
  checkedList: Contact[] = [];
  idContactForDelete: number;
  lenghtlistcontact = 0;

  getdata() {
    this.contactService
      .getContactCreatedByMe(this.tokenService.kc.idTokenParsed.sub)
      .subscribe((tem) => {
        this.contacts = tem;
        this.lenghtlistcontact = tem.length;
      });
  }
}
