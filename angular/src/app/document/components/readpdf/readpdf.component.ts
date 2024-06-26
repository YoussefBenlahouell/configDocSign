import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";

import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

let PDFJS: any;

function isSSR() {
  return typeof window === "undefined";
}

if (!isSSR()) {
  // @ts-ignore
  PDFJS = require("pdfjs-dist/build/pdf");
}

interface IPdfDocumentLoad {
  numPages: number;
}

@Component({
  selector: "app-readpdf",
  templateUrl: "./readpdf.component.html",
  styleUrls: ["./readpdf.component.css"],
})
export class ReadpdfComponent implements OnInit {
  thePdf = null;
  scale = 1;
  pdfSrc: string =
    "https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf";
  pageNumber = 3;

  bgColor = "rgba(0,0,0,0)";

  @Output()
  PdfDocumentLoad = new EventEmitter<IPdfDocumentLoad>();

  private _pdfDocument: any;

  constructor() {
    if (isSSR()) {
      return;
    }

    const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
    PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }

  ngOnInit(): void {
    PDFJS.getDocument(this.pdfSrc).promise.then((pdf) => {
      this.thePdf = pdf;
      const viewer: any = document.getElementById("pdf-viewer");

      for (let page = 1; page <= pdf.numPages; page++) {
        const canvas: any = document.createElement("canvas");
        canvas.className = "pdf-page-canvas";
        viewer.appendChild(canvas);
        this.renderPage(page, canvas);
      }
    });
  }

  renderPage(pageNumber, canvas) {
    this.thePdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: this.scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      });
    });
  }
}
