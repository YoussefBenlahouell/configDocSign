import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
import { organization } from "../../models/organization";
import { User } from "../../models/user";
import { CloudinaryService } from "../../services/cloudinary.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-consileprofileorg",
  templateUrl: "./consileprofileorg.component.html",
  styleUrls: ["./consileprofileorg.component.css"],
})
export class ConsileprofileorgComponent implements OnInit {
  file: any;
  org: organization;
  url;

  constructor(
    private tokenService: KeyclockSecurityService,
    private userservice: UserService,
    private cloudinaryService: CloudinaryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  checkoutForm = this.formBuilder.group({
    nameOrg: "",
    adressOrg: "",
    countryOrg: "",
    telOrg: "",
    postalcodeOrg: "",
    emailOrg: "",
    logoOrg: "",
  });

  onSubmit() {
    console.log(this.checkoutForm.value);
  }

  ngOnInit(): void {
    this.userservice
      .getUserFromBackById(this.tokenService.kc.idTokenParsed.sub)
      .subscribe(
        (x: any) => {
          this.org = x.organization;
          console.log(x.organization);
        },
        (err) => console.log(err),
        () => {
          console.log(this.org);
          this.checkoutForm.setValue({
            nameOrg: this.org.nameOrg,
            adressOrg: this.org.adressOrg,
            countryOrg: this.org.countryOrg,
            telOrg: this.org.telOrg,
            postalcodeOrg: this.org.postalcodeOrg,
            emailOrg: this.org.emailOrg,
            logoOrg: this.org.logoOrg,
          });
        }
      );
  }
  //https://api.cloudinary.com/v1_1
  uplodeImage() {
    const form = new FormData();
    form.append("file", this.file);
    form.append("upload_preset", "imageorg");

    this.cloudinaryService.addimage(form).subscribe(
      (x: any) => {
        this.org.logoOrg = x.url;
      },
      (err) => console.log(err),
      () => {
        console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssss");
        console.log(this.org);
        this.userservice
          .updateimageOrg(this.org.logoOrg, this.org.idOrg)
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
