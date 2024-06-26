import { TemplateRoutingModule } from "./template-routing.module";
import { TemplateComponent } from "./components/template/template.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TypesignatureComponent } from "./components/typesignature/typesignature.component";
import { UplodedocumentComponent } from "./components/uplodedocument/uplodedocument.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { DndDirective } from "./dnd.directive";
//import { DraggableDirective } from "./draggable.directive";
//import { DroppableDirective } from "./droppable.directive";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";

import { BrowserModule } from "@angular/platform-browser";
import { AngularDraggableModule } from "angular2-draggable";
import { FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
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
import { AllTemplateComponent } from "./components/all-template/all-template.component";
import { SharedWithMeComponent } from "./components/shared-with-me/shared-with-me.component";
import { CreatedByMeComponent } from "./components/created-by-me/created-by-me.component";
import { EditTemplateComponent } from "./components/edit-template/edit-template.component";
import { PageTitleComponent } from "./components/page-title/page-title.component";
@NgModule({
  declarations: [
    TemplateComponent,
    TypesignatureComponent,
    UplodedocumentComponent,
    UplodedocumentComponent,
    ProgressComponent,
    DndDirective,
    ReadpdfComponent,
    PDFViewerComponent,

    KonvaComponent,
    ElementsBarComponent,

    PdfFormComponent,
    PlaceholderPropertyComponent,
    TemplateProcessComponent,
    EmailConfigurationComponent,
    AllTemplateComponent,
    SharedWithMeComponent,
    CreatedByMeComponent,
    EditTemplateComponent,
    PageTitleComponent,
    //  DraggableDirective,
    //   DroppableDirective,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    DragDropModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
  ],

  exports: [TemplateComponent],
})
export class TemplateModule {}
