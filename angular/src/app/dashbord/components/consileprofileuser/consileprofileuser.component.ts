import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { User } from "../../models/user";
import { CloudinaryService } from "../../services/cloudinary.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-consileprofileuser",
  templateUrl: "./consileprofileuser.component.html",
  styleUrls: ["./consileprofileuser.component.css"],
})
export class ConsileprofileuserComponent implements OnInit {
  file: any;
  user: any;
  user2: any;
  url;

  constructor(
    private tokenService: KeyclockSecurityService,
    private userservice: UserService,
    private cloudinaryService: CloudinaryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  checkoutForm = this.formBuilder.group({
    lnameUser: null,
    fnameUser: null,
    emailUser: null,
    telUser: null,
    fonctionUser: null,
    creationDateUser: null,
    roleUser: null,
    contryUser: null,
    regionUser: null,
    birthDateUser: [""],
    imageprofileUser: null,
  });

  onSubmit() {
    this.user2 = this.user;

    (this.user2.lnameUser = this.checkoutForm.value.lnameUser),
      (this.user2.fnameUser = this.checkoutForm.value.fnameUser),
      (this.user2.emailUser = this.checkoutForm.value.emailUser),
      (this.user2.telUser = this.checkoutForm.value.telUser),
      (this.user2.fonctionUser = this.checkoutForm.value.fonctionUser),
      (this.user2.contryUser = this.checkoutForm.value.contryUser),
      (this.user2.regionUser = this.checkoutForm.value.regionUser),
      (this.user2.birthDateUser = this.checkoutForm.value.birthDateUser),
      (this.user2.imageprofileUser = this.checkoutForm.value.imageprofileUser),
      (this.user2.idUser = this.user.idUser);
    console.log(this.user2);
    this.userservice.editUser(this.user2).subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => window.location.reload()
    );
  }

  ngOnInit(): void {
    this.userservice
      .getUserFromBackById(this.tokenService.kc.idTokenParsed.sub)
      .subscribe(
        (x: any) => {
          this.user = x;

          console.log(x);
        },
        (err) => console.log(err),
        () => {
          this.checkoutForm.setValue({
            lnameUser: this.user.lnameUser,
            fnameUser: this.user.fnameUser,
            emailUser: this.user.emailUser,
            telUser: this.user.telUser,
            fonctionUser: this.user.fonctionUser,
            creationDateUser: this.user.creationDateUser,
            roleUser: this.user.roleUser,
            contryUser: this.user.contryUser,
            regionUser: this.user.regionUser,
            birthDateUser: formatDate(
              this.user.birthDateUser,
              "yyyy-MM-dd",
              "en"
            ),
            imageprofileUser: this.user.imageprofileUser,
          });
        }
      );
  }
  //https://api.cloudinary.com/v1_1
  uplodeImage() {
    const form = new FormData();
    form.append("file", this.file);
    form.append("upload_preset", "imageprofile");

    this.cloudinaryService.addimage(form).subscribe(
      (x: any) => {
        this.user.imageprofileUser = x.url;
      },
      (err) => console.log(err),
      () => {
        this.userservice
          .updateimage(
            this.user.imageprofileUser,
            this.tokenService.kc.idTokenParsed.sub
          )
          .subscribe((x) => console.log(x));
      }
    );
  }
  changephoto($event) {
    this.file = $event.target.files[0];
    console.log(this.file);
    this.uplodeImage();
  }
}
