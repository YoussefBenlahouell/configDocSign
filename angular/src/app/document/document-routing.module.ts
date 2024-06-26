import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllDocumentComponent } from "./components/all-document/all-document.component";
import { CreatedByMeComponent } from "./components/created-by-me/created-by-me.component";
import { DocumentFromTemplateComponent } from "./components/document-from-template/document-from-template.component";
import { DocumentComponent } from "./components/document/document.component";
import { EditDocumentComponent } from "./components/edit-document/edit-document.component";
import { ElementsBarComponent } from "./components/elements-bar/elements-bar.component";
import { KonvaComponent } from "./components/konva/konva.component";
import { PDFViewerComponent } from "./components/pdf-viewer/pdf-viewer.component";
import { PlaceholderComponent } from "./components/placeholder/placeholder.component";
import { ReadpdfComponent } from "./components/readpdf/readpdf.component";
import { SharedWithMeComponent } from "./components/shared-with-me/shared-with-me.component";
import { StatusComponent } from "./components/status/status.component";
import { TemplateProcessComponent } from "./components/template-process/template-process.component";
import { TypesignatureComponent } from "./components/typesignature/typesignature.component";

const routes: Routes = [
  {
    path: "",
    component: DocumentComponent,
  },

  {
    path: "pdfviewer",
    component: PDFViewerComponent,
  },
  {
    path: "documentprocess",
    component: TemplateProcessComponent,
    //   data: { extraParameter: "elementsMenu" },
  },

  {
    path: "alldocument",
    component: AllDocumentComponent,
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
    path: "editdocument/:id",
    component: EditDocumentComponent,
    //   data: { extraParameter: "" },
  },
  {
    path: "documentfromtemplate/:id",
    component: DocumentFromTemplateComponent,
    //   data: { extraParameter: "" },
  },

  {
    path: "readpdf",
    component: ReadpdfComponent,
  },
  {
    path: "status/:status",
    component: StatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
