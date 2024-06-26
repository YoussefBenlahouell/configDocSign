import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignatureComponent } from "./components/signature/signature.component";
import { VuePdfComponent } from "./components/vue-pdf/vue-pdf.component";

const routes: Routes = [
  {
    path: "",
    component: SignatureComponent,
  },

  {
    path: "viewpdf/:id",
    component: VuePdfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignatureRoutingModule {}
