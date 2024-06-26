import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DocumentSign } from "src/app/document/models/documentSign";
import { Document } from "src/app/template/models/document";
import { SiginupService } from "src/app/user/services/siginup.service";
import { SigneService } from "../../services/signe.service";
import { SmsService } from "../../services/sms.service";
import { UploadServiceService } from "../../services/upload-service.service";

@Component({
  selector: "app-vue-pdf",
  templateUrl: "./vue-pdf.component.html",
  styleUrls: ["./vue-pdf.component.sass"],
})
export class VuePdfComponent implements OnInit {
  msg = "";
  email = Math.floor(Math.random() * 999999999).toString() + "@gcsmail.cmm";
  base64;
  tokenUser: string;
  msgerror: boolean = false;
  src: Blob;
  docmentsign;
  id;
  codenumber = "5555";
  codechamp;
  accesinitiale: any;
  tokenadmin;
  i: number = 0;
  private sub: any;
  constructor(
    private signservice: SigneService,
    private formBuilder: FormBuilder,
    private smsservice: SmsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private siginupService: SiginupService,
    private uploadService: UploadServiceService
  ) {}
  resend() {
    /* this.codenumber = Math.floor(Math.random() * 9999999).toString();
    console.log(this.codenumber);
    this.smsservice
      .sendSmS(
        "Hello ,you can put this code to continue your singnature process. Code: " +
          this.codenumber,
        "25201185",
        "EfwyAfC6F6Aeefxl5tG7fVb6IzBf"
      )
      .subscribe((x) => console.log(x));*/
  }
  ngOnInit() {
    /*  this.codenumber = Math.floor(Math.random() * 9999999).toString();
    console.log(this.codenumber);
    // this.smsservice.token().subscribe((x) => console.log(x),(err)=>console.log(err),);
    this.smsservice
      .sendSmS(
        "Hello  ,you can put this code to continue your singnature process. Code: " +
          this.codenumber,
        "25201185",
        "EfwyAfC6F6Aeefxl5tG7fVb6IzBf"
      )
      .subscribe((x) => console.log(x));*/

    this.siginupService.tokenadmin().subscribe(
      (x: any) => {
        console.log("1");
        this.tokenadmin = x.access_token;
        console.log(x.access_token);
      },
      (err) => console.log(err),
      () => {
        console.log("2");
        this.sub = this.route.params.subscribe((params) => {
          this.id = params["id"];
          console.log(this.id);
          this.test();
        });
      }
    );
  }
  confirm() {
    if (this.codenumber != this.codechamp) this.msgerror = true;
    else this.i = this.i + 1;
  }
  next($event) {
    this.i = this.i + 1;
  }
  public loadLargeFile(): void {}
  test() {
    console.log("this.tokenadmin");
    console.log(this.tokenadmin);
    this.siginupService
      .addUserWithPasswordInKeyclockForsign(
        this.email,

        this.tokenadmin
      )
      .subscribe(
        () => (x) => console.log(x),
        (err) => {
          console.log(err);
        },
        () => {
          this.siginupService.tokenUserforSign(this.email).subscribe(
            (token) => {
              console.log("4");
              this.tokenUser = token.access_token;
              console.log(token);
            },
            (err) => console.log(err),
            () => {
              console.log(this.email);
              this.uploadService
                .getDocumentSignById(this.id, this.tokenUser)
                .subscribe((res: any) => {
                  console.log(res);
                  this.docmentsign = res;
                  this.base64 = res.filePdf.data;
                });
            }
          );
        }
      );
  }

  checkoutForm = this.formBuilder.group({
    name: null,
    organization: null,
    email: null,
    adress: null,
    objective: null,
    cin: null,
  });

  onSubmit() {
    console.log(this.checkoutForm.value);
    this.i++;
  }
  reject() {
    this.signservice
      .statutRejectedDocumentSign(this.docmentsign, this.tokenUser)
      .subscribe(
        (x) => console.log(x),
        (err) => console.log(err),
        () => {
          this.msg = "Signature rejected";
          this.i++;
        }
      );
  }
  confirmSign() {
    console.log(this.tokenUser);
    this.signservice
      .statutSignDocumentSign(this.docmentsign, this.tokenUser)
      .subscribe(
        (x) => console.log(x),
        (err) => console.log(err),
        () => {
          this.msg = "Signature completed";
          this.i++;
        }
      );
  }
}
