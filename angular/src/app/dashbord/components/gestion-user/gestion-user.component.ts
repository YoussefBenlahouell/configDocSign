import { Component, OnInit } from "@angular/core";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SiginupService } from "src/app/user/services/siginup.service";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { organization } from "../../models/organization";
@Component({
  selector: "app-gestion-user",
  templateUrl: "./gestion-user.component.html",
  styleUrls: ["./gestion-user.component.sass"],
})
export class GestionUserComponent implements OnInit {
  userinfo: User;
  admininfo: User;
  playinkey: any;
  selectedfunction = "HR";
  userForm = new FormGroup({
    idUser: new FormControl(""),
    lnameUser: new FormControl(""),
    fnameUser: new FormControl(""),
    emailUser: new FormControl(""),
    passwordUser: new FormControl(""),
    telUser: new FormControl(""),
    fonctionUser: new FormControl(""),
    roleUser: new FormControl(""),
    isSelected: new FormControl(""),
    idOrganization: new FormControl(""),
    gender: new FormControl(""),
  });
  function = [
    "HR",
    "Sales",
    "Production",
    "Finance",
    "Executive Direction",
    "Marketing",
    "IT",
  ];
  usertoadd: User;

  token;
  searchText;
  heading = "Team's Members  Management ";
  subheading = " ";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  faStar = faStar;
  faPlus = faPlus;
  public isActive: any; //for search

  cuurentidUser: string = "";
  notforshowUser: User[] = [];
  users: User[] = [];
  selectedUser: User[];
  pageSize = 7;
  page = 1;
  userforchange: User;
  lengthCHekedList: number = 0;
  masterSelected: boolean = true;
  checkedList: User[] = [];
  idUserForDelete: number;
  lenghtlistuser = 0;
  constructor(
    private router: Router,
    private tokenService: KeyclockSecurityService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: SiginupService,
    private user2Service: UserService
  ) {
    this.masterSelected = false;
    this.getCheckedItemList();
  }
  compareFn(option1, option2): boolean {
    if (option1 && option2) {
      return option1.name === option2.name;
    }
  }
  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    this.users.forEach((user) => (user.isSelected = this.masterSelected));
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.users.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    this.users.forEach((user) => {
      if (user.isSelected == true) this.checkedList.push(user);
    });
    console.log(this.checkedList);
    this.lengthCHekedList = this.checkedList.length;
  }

  ngOnInit(): void {
    this.cuurentidUser = this.tokenService.kc.idTokenParsed.sub;
    this.userService.tokenadmin().subscribe(
      (x: any) => {
        this.token = x.access_token;
      },
      (err) => console.log(err),
      () => {
        this.user2Service
          .getadmin(this.tokenService.kc.idTokenParsed.sub)
          .subscribe(
            (x) => {
              (this.admininfo = x), console.log(x);
            },
            (err) => console.log(err),
            () => this.getdata()
          );
      }
    );

    console.log(this.tokenService.kc);
  }

  getdata() {
    this.user2Service
      .getUsersFromBack(this.admininfo.organization.idOrg) //idOrganization
      .subscribe((tem) => {
        this.users = tem;
        this.lenghtlistuser = tem.length;
      });
  }
  onDelete() {
    /*
    this.userService.deleteUser(this.idUserForDelete).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );*/
  }

  onPlay(iduser) {
    this.user2Service.play(iduser).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => this.getdata()
    );
    this.user2Service.getuserfromkeyclock(this.token, iduser).subscribe(
      (x) => this.playinkey,
      (err) => console.log(err),
      () =>
        this.user2Service.changestatusUserinKeyclock(
          this.token,
          iduser,
          this.playinkey,
          true
        )
    );
  }
  onPause(iduser) {
    this.user2Service.pause(iduser).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => this.getdata()
    );
    this.user2Service.getuserfromkeyclock(this.token, iduser).subscribe(
      (x) => this.playinkey,
      (err) => console.log(err),
      () =>
        this.user2Service.changestatusUserinKeyclock(
          this.token,
          iduser,
          this.playinkey,
          false
        )
    );
  }
  onAdd() {
    console.log(this.userForm.value);
    let user: User = this.userForm.value;
    user.ishomme = this.userForm.value.gender == "male" ? true : false;
    user.imageprofileUser = user.ishomme
      ? "https://res.cloudinary.com/signatury/image/upload/v1655103009/lztw4wpqzip0fwxiiy7h.png"
      : "https://res.cloudinary.com/signatury/image/upload/v1655103125/fsfq8plugrd864pw8slo.png";
    this.userinfo = user;
    user.organization = this.admininfo.organization;
    this.usertoadd = user;
    this.saveUser(user);
  }
  onEdit($event) {
    console.log($event);

    let user: User = $event;
    user.organization = this.userforchange.organization;
    /*
    this.userService.editUser($event).subscribe(
      (x) => (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );*/
  }

  oncConfirmAdd() {
    this.tokenService.kc.idTokenParsed.sub;
  }
  onSubmitAdd(contentAdd) {
    this.modalService.open(contentAdd).result.then();
  }
  onSubmitEdit(contentEdit, user) {
    this.modalService.open(contentEdit).result.then();
    this.userforchange = user;
  }

  saveUser(user: User) {
    console.log(this.admininfo.organization.nameOrg);
    console.log(this.token);

    this.user2Service
      .addUserWithPasswordInKeyclockwithmailForchangeMotdepasse(
        user,
        this.token,
        this.admininfo.organization.nameOrg
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.findIdByEmail(user.emailUser);
        },
        (error) => {
          console.log(error.error.errorMessage);
        }
      );
  }

  findIdByEmail(email) {
    this.userService.findbyemail(this.token, email).subscribe(
      (x: any) => {
        console.log(x);
        this.usertoadd.idUser = x[0].id;
        this.usertoadd.isActive = true;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.sendEmail();
        this.user2Service
          .addRoletoUser(
            this.usertoadd.idUser,
            this.token,
            this.usertoadd.roleUser == "ADMIN"
          )
          .subscribe(
            (x) => console.log(x),
            (err) => console.log(err),
            () => {}
          );
      }
    );
  }
  sendEmail() {
    this.user2Service.addnewUser(this.usertoadd).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }
}
