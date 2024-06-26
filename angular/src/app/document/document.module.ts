import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DocumentRoutingModule } from "./document-routing.module";
import { DocumentComponent } from "./components/document/document.component";
import { TypesignatureComponent } from "./components/typesignature/typesignature.component";
import { UplodedocumentComponent } from "./components/uplodedocument/uplodedocument.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { DndDirective } from "./dnd.directive";
import { PlaceholderComponent } from "./components/placeholder/placeholder.component";
//import { DraggableDirective } from "./draggable.directive";
//import { DroppableDirective } from "./droppable.directive";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";

import { BrowserModule } from "@angular/platform-browser";
import { AngularDraggableModule } from "angular2-draggable";
import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReadpdfComponent } from "./components/readpdf/readpdf.component";
import { PDFViewerComponent } from "./components/pdf-viewer/pdf-viewer.component";
import { KonvaComponent } from "./components/konva/konva.component";
import { ElementsBarComponent } from "./components/elements-bar/elements-bar.component";
import { PdfFormComponent } from "./components/pdf-form/pdf-form.component";
import { PlaceholderPropertyComponent } from "./components/placeholder-property/placeholder-property.component";
import { TemplateProcessComponent } from "./components/template-process/template-process.component";
import { EmailConfigurationComponent } from "./components/email-configuration/email-configuration.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RecipientComponent } from "./components/recipient/recipient.component";
import { CreatedByMeComponent } from "./components/created-by-me/created-by-me.component";
import { SharedWithMeComponent } from "./components/shared-with-me/shared-with-me.component";
import { AllDocumentComponent } from "./components/all-document/all-document.component";
import { DocumentFromTemplateComponent } from "./components/document-from-template/document-from-template.component";
import { EditDocumentComponent } from "./components/edit-document/edit-document.component";
import { StatusComponent } from "./components/status/status.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { DashbordRoutingModule } from "../dashbord/dashbord-routing.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    DocumentComponent,
    TypesignatureComponent,
    UplodedocumentComponent,
    UplodedocumentComponent,
    ProgressComponent,
    DndDirective,
    PlaceholderComponent,
    ReadpdfComponent,
    PDFViewerComponent,

    KonvaComponent,
    ElementsBarComponent,

    PdfFormComponent,
    PlaceholderPropertyComponent,
    TemplateProcessComponent,
    EmailConfigurationComponent,
    RecipientComponent,
    CreatedByMeComponent,
    SharedWithMeComponent,
    AllDocumentComponent,
    DocumentFromTemplateComponent,
    EditDocumentComponent,
    StatusComponent,
    //  DraggableDirective,
    //   DroppableDirective,
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    AngularDraggableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    DragDropModule,
    Ng2SearchPipeModule,
    LoadingBarRouterModule,
    DashbordRoutingModule,
    PerfectScrollbarModule,
    PerfectScrollbarModule,
    FontAwesomeModule,

    HttpClientModule,
  ],

  exports: [DocumentComponent],
})
export class DocumentModule {}
