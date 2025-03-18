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
import { Router } from "@angular/router";
import { SiginupService } from "src/app/user/services/siginup.service";
import { User } from "../../models/user";
import { ShareWith } from "../../models/sharewith";
@Component({
  selector: "app-created-by-me",
  templateUrl: "./created-by-me.component.html",
  styleUrls: ["./created-by-me.component.sass"],
})
export class CreatedByMeComponent implements OnInit {
  heading = "  Template  created be me ";
  subheading = " ";
  icon = "pe-7s-paint icon-gradient bg-arielle-smile";
  listfolder: any[] = [];
  cuurentidUser: String = "";
  notforshowuser: User[] = [];
  users: User[];
  selectedUser: User[];
  masterSelectedUser: boolean;
  pageSize = 7;
  page = 1;
  idTemplateForShare: string = "";
  lengthCHekedList: number = 0;
  templates: Template[] = [];
  masterSelected: boolean;
  checkedList: Template[] = [];
  idTemplateForDelete: string = "";
  lenghtlisttmeplate = 0;

  constructor(
    private router: Router,
    private templateService: TemplateService,
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
    this.templates.forEach(
      (template) => (template.isSelected = this.masterSelected)
    );
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.templates.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    this.templates.forEach((template) => {
      if (template.isSelected == true) this.checkedList.push(template);
    });

    console.log(this.checkedList);
    this.lengthCHekedList = this.checkedList.length;
  }

  ngOnInit(): void {
    this.getdata();
    this.cuurentidUser = this.tokenService.kc.idTokenParsed.sub;
  }

  getdata() {
    this.templateService
      .getTemplatesCreatedByMe(this.tokenService.kc.idTokenParsed.sub)
      .subscribe(
        (tem) => {
          this.templates = tem;
          console.log(tem);
          this.lenghtlisttmeplate = tem.length;
        },
        (err) => console.log(err),
        () => {
          console.log(this.templates[0].folder.nameFolder);
        }
      );
  }
  onDelete() {
    this.templateService.deleteTemplate(this.idTemplateForDelete).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }
  onCopy(template) {
    let copytemplate: Template = template;
    copytemplate.idTemplate = null;
    copytemplate.idOwner = this.tokenService.kc.idTokenParsed.sub;
    copytemplate.nameTemplate = copytemplate.nameTemplate + " (copy)";
    copytemplate.filePdf.id = null;
    copytemplate.mail.idMail = null;
    this.templateService
      .copyTemplate(copytemplate)
      .subscribe(() => this.getdata());
  }
  onSubmit(content, idtemplate) {
    this.modalService.open(content).result.then();
    this.idTemplateForDelete = idtemplate;
  }

  onPlay(idtemplate) {
    this.router.navigateByUrl(
      "dashbord/document/documentfromtemplate/" + idtemplate
    );
  }
  onEdit(idtemplate) {
    this.router.navigateByUrl("dashbord/template/edittemplate/" + idtemplate);
  }
  onShare(contentShare, idtemplate) {
    this.modalService.open(contentShare).result.then();
    this.idTemplateForShare = idtemplate;
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
    this.templateService
      .getFolderbyidowner(this.tokenService.kc.idTokenParsed.sub)
      .subscribe((x) => (this.listfolder = x));
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
      let sharewith = new ShareWith(
        null,
        user.canDelete,
        user.canEdit,
        user.canUse,
        user.canShare,
        user.idUser,
        this.idTemplateForShare
      );
      this.templateService
        .addShareWith(sharewith)
        .subscribe((x) => console.log(x));
    });
  }
}
