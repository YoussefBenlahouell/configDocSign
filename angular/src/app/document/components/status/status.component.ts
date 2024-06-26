import { Component, OnInit } from "@angular/core";
import { TemplateService } from "../../services/template.service";
import { Template } from "../../models/template";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import {
  faTh,
  faCheck,
  faTrash,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SiginupService } from "src/app/user/services/siginup.service";
import { User } from "../../models/user";
import { ShareWithForDoc } from "../../models/sharewith";
import { DocumentSignService } from "../../services/document-sign.service";
import { DocumentSign } from "../../models/documentSign";
import { FolderDocService } from "../../services/folder-doc.service";
import { Folderdoc } from "../../models/folder";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.sass"],
})
export class StatusComponent implements OnInit {
  status;
  sub;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.status = params["status"]; // (+) converts string 'id' to a number
      console.log(this.status);
      this.heading = params["status"] + " Document";
      this.getdata();
      this.cuurentidUser = this.tokenService.kc.idTokenParsed.sub;
    });
  }
  selectedfile: Folderdoc;
  heading = "  ";
  subheading = " ";
  icon = "pe-7s-diamond icon-gradient bg-strong-bliss";
  listfolder: any[] = [];
  cuurentidUser: String = "";
  notforshowuser: User[] = [];
  users: User[];
  selectedUser: User[];
  masterSelectedUser: boolean;
  pageSize = 7;
  page = 1;
  idDocumentForShare: string = "";
  lengthCHekedList: number = 0;
  documents: DocumentSign[] = [];
  masterSelected: boolean;
  checkedList: DocumentSign[] = [];
  idDocumentForDelete: String = "";
  lenghtlisttmeplate = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private folderDoc: FolderDocService,
    private router: Router,
    private docuemntservice: DocumentSignService,
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
    this.documents.forEach(
      (document) => (document.isSelected = this.masterSelected)
    );
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.documents.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    this.documents.forEach((document) => {
      if (document.isSelected == true) this.checkedList.push(document);
    });

    console.log(this.checkedList);
    this.lengthCHekedList = this.checkedList.length;
  }

  getdata() {
    this.docuemntservice
      .getDocumentsCreatedAndSharedWithMe(
        this.tokenService.kc.idTokenParsed.sub
      )
      .subscribe(
        (tem) => {
          this.documents = tem.filter((x) => x.status == this.status);
          console.log(tem);
          this.lenghtlisttmeplate = tem.length;
        },
        (err) => console.log(err),
        () => {
          //    console.log(this.documents[0].folder.nameFolder);
        }
      );
  }
  onDelete() {
    this.docuemntservice.deleteDocumentSign(this.idDocumentForDelete).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }
  onCopy(document) {
    let copydocument: DocumentSign = document;
    copydocument.idDocumentSign = null;
    copydocument.idCreatedBy = this.tokenService.kc.idTokenParsed.sub;
    copydocument.nameDocumentSign = copydocument.nameDocumentSign + "(copy)";
    copydocument.filePdf.id = null;
    copydocument.mail.idMail = null;
    this.docuemntservice
      .copyDocumentSign(copydocument)
      .subscribe(() => this.getdata());
  }
  onSubmit(content, iddocument) {
    this.modalService.open(content).result.then();
    this.idDocumentForDelete = iddocument;
  }

  onShare(contentShare, iddocument) {
    this.modalService.open(contentShare).result.then();
    this.idDocumentForShare = iddocument;
    this.userService.getUsersFromBack().subscribe(
      (x) => (this.users = x),
      (err) => {
        console.log(err);
      },
      () => {
        this.users.splice(
          this.users.indexOf(
            this.users.find(
              (user) => user.idUser == this.tokenService.kc.idTokenParsed.sub
            )
          ),
          1
        );
      }
    );
  }
  onFolder(contentfolder) {
    this.modalService.open(contentfolder).result.then();
    this.folderDoc
      .getFolderbyidowner(this.tokenService.kc.idTokenParsed.sub)
      .subscribe((x) => (this.listfolder = x));
  }
  affecterFoldertodoc() {}
  folderchanger($event) {
    this.selectedfile = $event;
    console.log($event);
  }
  oncConfirmFolder() {
    //this.templateService.editTemplate();
  }
  deletcurrentUser() {
    for (let i = 0; i < this.users.length; i++)
      if (this.cuurentidUser == this.users[i].idUser) this.users.splice(i, 1);
  }
  checkUncheckAllUser() {
    this.users.forEach((user) => (user.isSelected = this.masterSelectedUser));
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelectedUser() {
    this.masterSelectedUser = this.users.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListUser();
  }

  // Get List of Checked Items
  getCheckedItemListUser() {
    this.selectedUser = [];
    this.users.forEach((user) => {
      if (user.isSelected == true) this.selectedUser.push(user);
    });

    console.log(this.selectedUser);
  }
  oncConfirmShare() {
    this.tokenService.kc.idTokenParsed.sub;
    console.log(this.selectedUser);
    this.selectedUser.forEach((user) => {
      let sharewith = new ShareWithForDoc(
        null,
        user.canDelete,
        user.canShare,
        user.idUser,
        this.idDocumentForShare
      );
      this.docuemntservice.addShareWith(sharewith).subscribe(
        (x) => console.log(x),
        (err) => console.log(err),
        () => () => window.location.reload()
      );
    });
  }
}
