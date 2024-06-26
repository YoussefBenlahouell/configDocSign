import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignatureRoutingModule } from "./signature-routing.module";
import { FormForCertifComponent } from "./components/form-for-certif/form-for-certif.component";
import { SignatureComponent } from "./components/signature/signature.component";
import { VuePdfComponent } from "./components/vue-pdf/vue-pdf.component";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [FormForCertifComponent, SignatureComponent, VuePdfComponent],
  imports: [
    CommonModule,
    SignatureRoutingModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SignatureComponent],
})
export class SignatureModule {}
