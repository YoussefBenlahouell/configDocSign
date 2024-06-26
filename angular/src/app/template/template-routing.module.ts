import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllTemplateComponent } from "./components/all-template/all-template.component";
import { CreatedByMeComponent } from "./components/created-by-me/created-by-me.component";
import { EditTemplateComponent } from "./components/edit-template/edit-template.component";

import { ElementsBarComponent } from "./components/elements-bar/elements-bar.component";
import { ReadpdfComponent } from "./components/readpdf/readpdf.component";
import { SharedWithMeComponent } from "./components/shared-with-me/shared-with-me.component";
import { TemplateProcessComponent } from "./components/template-process/template-process.component";
import { TemplateComponent } from "./components/template/template.component";

const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    //  data: { extraParameter: " " },
  },

  {
    path: "elementbar",
    component: ElementsBarComponent,
  },
  {
    path: "alltemplate",
    component: AllTemplateComponent,
    //   data: { extraParameter: "FilterTemplate" },
  },
  {
    path: "sharedwithme",
    component: SharedWithMeComponent,
    //  data: { extraParameter: "FilterTemplate" },
  },
  {
    path: "createdbyme",
    component: CreatedByMeComponent,
    //  data: { extraParameter: "FilterTemplate" },
  },
  {
    path: "templateprocess",
    component: TemplateProcessComponent,
    //   data: { extraParameter: "" },
  },
  {
    path: "edittemplate/:id",
    component: EditTemplateComponent,
    //   data: { extraParameter: "" },
  },

  {
    path: "readpdf",
    component: ReadpdfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
