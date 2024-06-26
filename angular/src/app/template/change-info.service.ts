import { Injectable } from "@angular/core";
import { Document } from "./models/document";

@Injectable({
  providedIn: "root",
})
export class ChangeInfoService {
  pdfUplodedListId: Document[] = [];
  constructor() {}

  addPdfId(pdfInfo: Document) {
    this.pdfUplodedListId.push(pdfInfo);
  }
  deletePdfId(index) {
    this.pdfUplodedListId.splice(index, 1);
  }
  takePdf(): Document {
    console.log("serviceee");
    console.log(this.pdfUplodedListId[0]);
    return this.pdfUplodedListId[0];
  }
}
