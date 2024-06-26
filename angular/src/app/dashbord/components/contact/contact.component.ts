import { Component, OnInit } from "@angular/core";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SiginupService } from "src/app/user/services/siginup.service";
import { Contact } from "../../models/contact";
import { ContactService } from "../../services/contact.service";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.sass"],
})
export class ContactComponent implements OnInit {
  searchText;
  heading = "Contact Management";
  subheading = " ";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  faStar = faStar;
  faPlus = faPlus;
  public isActive: any; //for search

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
  constructor(
    private router: Router,
    private contactService: ContactService,
    private tokenService: KeyclockSecurityService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: SiginupService
  ) {
    this.masterSelected = false;
    this.getCheckedItemList();
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    this.contacts.forEach(
      (contact) => (contact.isSelected = this.masterSelected)
    );
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.contacts.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    this.contacts.forEach((contact) => {
      if (contact.isSelected == true) this.checkedList.push(contact);
    });

    console.log(this.checkedList);
    this.lengthCHekedList = this.checkedList.length;
  }

  ngOnInit(): void {
    this.getdata();
    this.cuurentidUser = this.tokenService.kc.idTokenParsed.sub;
  }

  getdata() {
    this.contactService
      .getContactCreatedByMe(this.tokenService.kc.idTokenParsed.sub)
      .subscribe((tem) => {
        this.contacts = tem;
        this.lenghtlistcontact = tem.length;
      });
  }
  onDelete() {
    this.contactService.deleteContact(this.idContactForDelete).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }

  onSubmit(content, idcontact) {
    this.modalService.open(content).result.then();
    this.idContactForDelete = idcontact;
    console.log(this.idContactForDelete);
  }
  onAdd($event) {
    let contact: Contact = $event;
    contact.idUser = this.cuurentidUser;
    this.contactService.addContact(contact).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }
  onEdit($event) {
    console.log($event);
    let contact: Contact = $event;
    contact.idContact = this.contactforchange.idContact;
    this.contactService.editContact($event).subscribe(
      (x) => (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }

  oncConfirmAdd() {
    this.tokenService.kc.idTokenParsed.sub;
  }
  onSubmitAdd(contentAdd) {
    this.modalService.open(contentAdd).result.then();
  }
  onSubmitEdit(contentEdit, contact) {
    this.modalService.open(contentEdit).result.then();
    this.contactforchange = contact;
  }
}
