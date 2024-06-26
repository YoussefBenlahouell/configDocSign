import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { SiginupService } from "src/app/user/services/siginup.service";
import { organization } from "../../models/organization";
import { User } from "../../models/user";
import { CloudinaryService } from "../../services/cloudinary.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"],
})
export class ChangepasswordComponent implements OnInit {
  file: any;
  org: organization;
  url;
  token;
  constructor(
    private tokenService: KeyclockSecurityService,
    private userService: SiginupService,
    private cloudinaryService: CloudinaryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  checkoutForm = this.formBuilder.group({
    oldPassword: "",
    newPassword: "",
    verifyPassword: "",
  });

  onSubmit() {
    console.log(this.checkoutForm.value);
    this.userService
      .changepassword(
        this.tokenService.kc.idTokenParsed.sub,
        this.token,
        this.checkoutForm.value.newPassword
      )
      .subscribe(
        (x) => {
          console.log(x);
        },
        (err) => console.log(err),
        () => window.location.reload()
      );
  }

  ngOnInit(): void {
    this.tokenService.kc.idTokenParsed.sub;
    this.userService.tokenadmin().subscribe(
      (x: any) => {
        this.token = x.access_token;
      },
      (err) => console.log(err),
      () => {}
    );
  }
}
