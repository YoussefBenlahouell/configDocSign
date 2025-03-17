import { HttpClient } from "@angular/common/http";
import { isNull, THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { countries } from "../../models/countrydata";
import { Organization } from "../../models/organization";
import { User } from "../../models/user";

import { SiginupService } from "../../services/siginup.service";
import { TokenStorageService } from "../../services/token-storage.service";
import {
  passwordIncludeName,
  MustMatch,
  CustomValidators,
  passchecker,
} from "./validator-password";
@Component({
  selector: "app-signuptest",
  templateUrl: "./signuptest.component.html",
  styleUrls: ["./signuptest.component.css"],
})
export class SignuptestComponent implements OnInit {
  org: any;
  userInfo: User;
  iduser: string;
  errors: any;
  iserror: boolean;
  token: any;
  isempty: boolean = true;
  ischange: boolean = false;
  selected: string = "tasss";
  public countries: any = countries;
  numbercountry: string;
  reactiveform: FormGroup;
  onsubmitted: boolean = false;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  i: number = 0;
  j: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private formbuilder: FormBuilder,
    private siginupService: SiginupService,
    public securityservice: KeyclockSecurityService
  ) {
    this.userInfo = new User();

    this.siginupService.tokenadmin().subscribe((x: any) => {
      this.token = x.access_token;
      console.log(x.access_token);
    });
  }

  ngOnInit() {
    this.reactiveform = this.formbuilder.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(2)]],

        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            CustomValidators.patternValidator(this.emailRegEx, {
              missingDomain: true,
            }),
          ],
        ],

        tel: [
          "",
          [
            Validators.required,
            CustomValidators.patternValidator(/^[+ 0-9]*$/, {
              allnumber: true,
            }),
            Validators.minLength(13),
          ],
        ],
        Organization: ["", [Validators.required, Validators.minLength(2)]],
        confirmpassword: ["", [Validators.required, Validators.minLength(1)]],
        country: ["", [Validators.required]],

        password: [
          "",
          [
            Validators.required,
            CustomValidators.patternValidator(/[A-Z]/, {
              containUpperCase: true,
            }),
            CustomValidators.patternValidator(/[0-9]/, {
              containchiffre: true,
            }),
            CustomValidators.patternValidator(/[#?!@$%^&*-]/, {
              containsymbol: true,
            }),
            Validators.minLength(8),
          ],
        ],

        termsandcondition: [false, Validators.requiredTrue],
      },
      {
        validators: [
          passchecker("password", "confirmpassword"),
          passwordIncludeName("firstName", "lastName", "password"),
        ],
      }
    );
  }

  get h() {
    return this.reactiveform.controls;
  }

  onReset() {
    this.onsubmitted = false;
    this.reactiveform.reset();
  }

  public onOptionsSelected(event) {
    const value = event.target.value;
    if (event.target.value == "" || event.target.value == null) {
      this.isempty = true;
    }
    if (event.target.value != "" && event.target.value != null) {
      this.isempty = false;
    }
    this.ischange = true;
    this.selected = value;
    let x = countries.map((x) => x.name).indexOf(value);

    this.numbercountry = "+" + countries[x].number + " ";
  }

  onSubmit() {
    this.onsubmitted = true;
    if (this.reactiveform.invalid) {
      return;
    }
    console.table(this.reactiveform.value);
    console.table(this.reactiveform);
    alert("Success signup\n" + JSON.stringify(this.reactiveform.value));
    this.userInfo.lnameUser = this.reactiveform.value.lastName;
    this.userInfo.fnameUser = this.reactiveform.value.firstName;
    this.userInfo.emailUser = this.reactiveform.value.email;
    this.userInfo.fonctionUser = "Direction";
    this.userInfo.roleUser = "ADMIN";
    this.userInfo.passwordUser = this.reactiveform.value.password;
    this.userInfo.telUser = this.reactiveform.value.tel;

    //this.token = this.tokenStorageService.getRefreshToken();
    console.log(this.token);
    this.siginupService
      .creategroup(this.token, this.reactiveform.value.Organization)
      .subscribe(
        (x) => console.log("xxxxxxxxxxxxx" + x),
        (err) => console.log(err),
        () =>
          this.siginupService
            .getidgroupByname(this.token, this.reactiveform.value.Organization)
            .subscribe(
              (t) => {
                this.org = t.filter(
                  (orgs) => orgs.name == this.reactiveform.value.Organization
                )[0];
                console.log(this.org);
              },

              (err) => console.log(err),
              () => this.saveUser(this.reactiveform.value.Organization)
            )
      );
  }

  saveUser(orgname) {
    this.siginupService
      .addUserWithPasswordInKeyclock(this.userInfo, this.token, orgname)
      .subscribe(
        (res) => {
          console.log(res);
          this.findIdByEmail();
        },
        (error) => {
          console.log(error.error.errorMessage);
          this.iserror = true;
          this.errors = error.error.errorMessage;
        }
      );
  }

  findIdByEmail() {
    this.siginupService
      .findbyemail(this.token, this.userInfo.emailUser)
      .subscribe(
        (x: any) => {
          console.log(x);
          this.iduser = x[0].id;
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.siginupService
            .addRoletoUser(this.iduser, this.token)
            .subscribe((x) => console.log(x));
          this.sendEmail(this.iduser);

          this.userInfo.idUser = this.iduser;
          let org: Organization = new Organization(
            this.org.id,
            this.reactiveform.value.Organization,
            null,
            this.reactiveform.value.country,
            null,
            null,
            null,
            null
          );
          this.userInfo.organization = org;
          this.userInfo.imageprofileUser =
            "https://res.cloudinary.com/signatury/image/upload/v1655103009/lztw4wpqzip0fwxiiy7h.png";
          this.siginupService
            .addnewUser(
              this.userInfo
              //  this.tokenStorageService.getToken()
            )
            .subscribe((x) => console.log(x));
        }
      );
  }
  sendEmail(idUser: string) {
    this.siginupService.sendVerifyEmail(this.token, idUser).subscribe(
      (res) => {
        //addnewUser;
      },
      (error) => {
        this.securityservice.kc.login({
          redirectUri: "http://localhost:80/dashbord",
        });
      },
      () => {
        this.securityservice.kc.login({
          redirectUri: "http://localhost:80/dashbord",
        });
      }
    );
  }
}
