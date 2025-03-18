import Konva from "konva";
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { forEachChild, transform } from "typescript";
import { Placeholder } from "../../models/placeholder";

import { UploadFileService } from "../../services/upload-file.service";
import { ChangeInfoService } from "../../services/change-info.service";
import { Observable, timer } from "rxjs";
import { nextTick } from "process";
import { AttrAst } from "@angular/compiler";
import { Document } from "../../models/document";

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
  selector: "app-konva",
  templateUrl: "./konva.component.html",
  styleUrls: ["./konva.component.css"],
})
export class KonvaComponent implements OnInit {
  thePdf = null;

  pdfSrc: string =
    "/files/a9f520d7-c7bd-4c03-939e-0106f555e2c3";
  document: Document;

  pdfGroup;
  msgError = "";
  scale = 1;

  bgColor = "rgba(0,0,0,0)";
  currentpage: any;
  private _pdfDocument: any;
  textInfo;
  ///////////////////
  //@Input() pdfInput: any;
  t: boolean = true;

  listofendpage: number[] = [];
  scrollContainer = document.getElementById("scroll-container");
  menuNode;
  allElementGroup;
  public defaultChoice: string = "2";
  selectedPlacerholder: Placeholder;
  placerholders: Placeholder[];

  layer: any;
  layerPdf: any;
  stage: any;
  tr: any;
  userr = "user1";
  currentShape;
  @Output() deletei = new EventEmitter<number>();
  @Output() addi = new EventEmitter<number>();
  radioSelected: any;
  enum_details = [{ name: "pardeep" }, { name: "Jain" }, { name: "Angular" }];
  prior() {
    var json = JSON.parse(this.allElementGroup.toJSON()).children;
    console.log(json);

    this.placerholders.forEach((x) => (x.elements.length = 0));
    json.forEach((y) => {
      let index = this.placerholders.findIndex(
        (x) => x.idPlaceholder == y.attrs.name
      );
      console.log(index);

      //   this.placerholders[index].elements.push(JSON.stringify(y));
      this.placerholders[index].elements.push(y);
    });
    this.changeInfoService.placeholders = this.placerholders;
    this.deletei.emit(1);
  }
  next() {
    var json = JSON.parse(this.allElementGroup.toJSON()).children;
    console.log(json);

    this.placerholders.forEach((x) => (x.elements.length = 0));
    json.forEach((y) => {
      let index = this.placerholders.findIndex(
        (x) => x.idPlaceholder == y.attrs.name
      );
      console.log(index);

      //   this.placerholders[index].elements.push(JSON.stringify(y));
      this.placerholders[index].elements.push(y);
    });
    this.changeInfoService.placeholders = this.placerholders;
    this.addi.emit(1);
  }
  onSelectionChange(place: Placeholder) {
    this.selectedPlacerholder = place;
    console.log("xxxxxx" + this.radioSelected);
    console.log(place);
    // this.layer.listening(false);  this.layer.listening(true);
  }

  constructor(private changeInfoService: ChangeInfoService) {
    if (isSSR()) {
      return;
    }
    const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
    PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }
  ///loadpdf
  renderPage(pageNumber, canvas, pdfnbrpage) {
    this.thePdf.getPage(pageNumber).then((page) => {
      console.log("yyyyyyyyyyyyyyyy" + page.view);
      const viewport = page.getViewport({ scale: this.scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      console.log(viewport.height + "hight bel scalre");
      /*
      this.stage = new Konva.Stage({
        container: "container",
        width: viewport.width + 8,
        // height: window.innerHeight,
        height: viewport.height * pdfnbrpage + pdfnbrpage * 37,
      });
*/
      page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      });
      this.listofendpage.push(
        pageNumber * viewport.height + 30 * pageNumber + 5
      );

      const grouppdf = new Konva.Group({
        width: viewport.width,
        height: viewport.height,
        x: 5,
        y: (pageNumber - 1) * viewport.height + 30 * (pageNumber - 1) + 5,
        listening: false,
        name: pageNumber.toString(),
      });
      console.log("aaaaaaaaaaaaaaaaa");
      console.log(
        (pageNumber - 1) * viewport.height + 30 * (pageNumber - 1) + 5
      );
      grouppdf.add(
        new Konva.Image({
          image: canvas,
          stroke: "#757d7b",
          strokeWidth: 4,
          width: viewport.width,
          height: viewport.height,

          listening: false,
        }),
        new Konva.Text({
          x: viewport.width - 24,
          y: viewport.height + 8 * this.scale,

          text: pageNumber.toString() + "/" + this.document.nbrPage.toString(),
          fontSize: 15,
          fontFamily: "Calibri",
          fill: "black",
        })
      );
      this.pdfGroup.add(grouppdf);

      console.log("page fin : " + pageNumber);
      if (pageNumber == pdfnbrpage) this.createkonva();
    });

    //this.currentpage = grouppdf;
  }

  /////

  crerateStage() {
    this.stage = new Konva.Stage({
      container: "container",
      width: this.document.width * this.scale + 8,

      height:
        this.document.height * this.scale * this.document.nbrPage +
        this.document.nbrPage * 31,
    });
    this.tr = new Konva.Transformer();
    this.allElementGroup = new Konva.Group();
    this.pdfGroup = new Konva.Group();
    this.layer = new Konva.Layer();

    for (let page = 1; page <= this.document.nbrPage; page++) {
      const canvas: any = document.createElement("canvas");
      canvas.className = "pdf-page-canvas";
      console.log("page debut : " + page);
      this.renderPage(page, canvas, this.document.nbrPage);
    }
  }

  ngOnInit(): void {
    this.document = this.changeInfoService.takePdf();
    this.placerholders = this.changeInfoService.placeholders;
    console.log(this.placerholders);
    this.selectedPlacerholder = this.placerholders[0];

    let pdfData = atob(this.changeInfoService.pdfUplodedList[0].data);
    console.log(pdfData);
    PDFJS.getDocument({ data: pdfData }).promise.then((pdf) => {
      this.thePdf = pdf;
      console.log(pdf);
      this.crerateStage();
    });

    ////

    /////

    //handle click

    /* element.addEventListener("click", (e) => {
        e.preventDefault();
        const anchor = (e.target as HTMLDivElement).closest("a");
        if (!anchor) return;
        console.log(anchor.getAttribute("class"));
        this.createShape(200, 200);
      });*/

    //   this.domIncanvas();
  }

  /*
 this.scrollContainer.addEventListener("scroll", this.repositionStage);
      this.repositionStage();
  repositionStage() {
    var PADDING = 500;

    var dx = this.scrollContainer.scrollLeft - PADDING;
    var dy = this.scrollContainer.scrollTop - PADDING;
    this.stage.container().style.transform =
      "translate(" + dx + "px, " + dy + "px)";
    this.stage.x(-dx);
    this.stage.y(-dy);
  }*/

  createkonva() {
    console.log("tawww 5edmet el konva");
    this.menuNode = document.getElementById("menu");
    this.layer.add(this.pdfGroup);
    this.layer.add(this.allElementGroup);
    this.stage.add(this.layer);
    this.placerholders.forEach((x) => {
      if (x.elements.length > 0) {
        x.elements.forEach((t) => {
          var rectangle = Konva.Group.create(t);
          rectangle.children[0].fill(t.children[1].attrs.fill);

          console.log(rectangle);
          rectangle.on("dragstart", (e) => {
            this.stageLimite(rectangle);
            //   rectangle.y(Math.min(rectangle.y(), this.stage.height));
          });
          this.allElementGroup.add(rectangle);
        });
      }
    });
    this.dragShapToCanvas();

    window.addEventListener("click", () => {
      this.menuNode.style.display = "none";
    });
    this.stage.on("contextmenu  ", (e) => {
      //for delete
      if (e.target !== this.stage) {
        e.evt.preventDefault();
        this.stageLimite(e.target.parent);
        this.menuNode.style.display = "initial";
        var containerRect = this.stage.container().getBoundingClientRect();
        this.menuNode.style.top =
          containerRect.top + this.stage.getPointerPosition().y + 4 + "px";
        this.menuNode.style.left =
          containerRect.left + this.stage.getPointerPosition().x + 4 + "px";
        this.deleteShape(e.target.parent);
      } else this.tr.nodes([]);
    });

    this.stage.on("click  ", (e) => {
      //select element

      if (e.target !== this.stage) {
        this.stageLimite(e.target.parent);
        console.log(e);
      } else this.tr.nodes([]);
    });
    this.clickShapToAddCanvas();
  }

  topage(shape) {
    shape.on("transformend", (e) => {
      //if (shape.height() * shape.scaleY() < 15) shape.height(15.5);
      const rectdebut = shape.y();
      const rectMidel = shape.y() + (shape.height() * shape.scaleY()) / 2;
      const rectFin = shape.y() + shape.height() * shape.scaleY();
      console.log(rectdebut, rectMidel, rectFin);
      var i = 0;
      var found: boolean = false;
      while (i <= this.document.nbrPage && found == false) {
        i++;
        console.log("iiiiiiii=" + i);
        var pageheight =
          this.document.height * this.scale * i + 30 * this.scale * (i - 1) + 5;
        var pageheightmidel = pageheight + 15;
        var pageheightfin = pageheight + 30;
        console.log(pageheight, pageheightmidel, pageheightfin);
        /* if (pageheight < rectMidel && rectMidel < pageheightmidel)
          shape.y(pageheight - shape.height() * shape.scaleY());
        if (pageheightmidel < rectMidel && rectMidel < rectFin)
          shape.y(pageheightfin + 3);*/
        if (rectMidel < pageheight && rectFin > pageheight) {
          shape.y(pageheight - shape.height() * shape.scaleY());
          found = true;
        }

        if (rectMidel < pageheightmidel && rectFin > pageheightmidel) {
          shape.y(pageheight - shape.height() * shape.scaleY());
          found = true;
          console.log("i!");
          console.log(i);
          console.log(found);
        }

        if (rectMidel > pageheightmidel && rectdebut < pageheightmidel) {
          shape.y(pageheightfin + 3);
          found = true;
          console.log("i!");
          console.log(i);
          console.log(found);
        }

        if (rectMidel > pageheightfin && rectdebut < pageheightfin) {
          shape.y(pageheightfin + 3);
          found = true;
          console.log("i!");
          console.log(i);
          console.log(found);
        }
      }
    });
    shape.on("dragend  ", (e) => {
      //if (shape.height() * shape.scaleY() < 15) shape.height(15.5);
      const rectdebut = shape.y();
      const rectMidel = shape.y() + (shape.height() * shape.scaleY()) / 2;
      const rectFin = shape.y() + shape.height() * shape.scaleY();

      var i = 0;
      var found: boolean = false;
      while (i <= this.document.nbrPage && found == false) {
        i++;
        console.log("iiiiiiii=" + i);
        var pageheight =
          this.document.height * this.scale * i + 30 * this.scale * (i - 1) + 5;
        var pageheightmidel = pageheight + 15;
        var pageheightfin = pageheight + 30;
        console.log(pageheight, pageheightmidel, pageheightfin);
        /* if (pageheight < rectMidel && rectMidel < pageheightmidel)
          shape.y(pageheight - shape.height() * shape.scaleY());
        if (pageheightmidel < rectMidel && rectMidel < rectFin)
          shape.y(pageheightfin + 3);*/
        if (rectMidel < pageheight && rectFin > pageheight) {
          shape.y(pageheight - shape.height() * shape.scaleY());
          found = true;
        }

        if (rectMidel < pageheightmidel && rectFin > pageheightmidel) {
          shape.y(pageheight - shape.height() * shape.scaleY());
          found = true;
        }

        if (rectMidel > pageheightmidel && rectdebut < pageheightmidel) {
          shape.y(pageheightfin + 3);
          found = true;
        }

        if (rectMidel > pageheightfin && rectdebut < pageheightfin) {
          shape.y(pageheightfin + 3);
          found = true;
        }
      }
    });
  }
  Info(shape) {
    var tr2 = new Konva.Transformer();
    this.tr.nodes([shape]);

    shape.on("transformend", () => {
      updateText();
    });

    shape.on("dragend", () => {
      updateText();
    });
    function updateText() {
      var lines = [
        "x: " + shape.x(),
        "y: " + shape.y(),
        "rotation: " + shape.rotation(),
        "width: " + shape.width(),
        "height: " + shape.height(),
        "scaleX: " + shape.scaleX(),
        "scaleY: " + shape.scaleY(),
      ];

      console.log(lines);
    }
  }

  createShape(layerX, layerY, nameElement) {
    console.log(this.currentpage);
    const width = 110;
    if (layerX + width / 2 > this.document.width)
      layerX = this.document.width + 3 - width / 2;
    const txt = new Konva.Text({
      text: nameElement,
      fontSize: 15,
      fontFamily: "Calibri",
      fill: "#000",
      width: 110,
      padding: 5,
      align: "center",
    });
    const rect = new Konva.Rect({
      width: width,
      height: 25,
      fill: this.selectedPlacerholder.colorPlaceholder,
      opacity: 0.6,

      cornerRadius: 3,
      stroke: "#757d7b",
      strokeWidth: 1.5,
    });
    const rectangle = new Konva.Group({
      width: width,
      x: layerX - width / 2,
      y: layerY,
      height: 25,
      draggable: true,
      name: this.selectedPlacerholder.idPlaceholder,
    })
      .add(txt)
      .add(rect);
    //  this.placerholders.find((x) => x == this.selectedPlacerholder).elements =      rectangle;

    /* var tr2 = new Konva.Transformer({
      nodes: [rectangle],
    });*/

    // this.layer.add(tr2);

    /* if (Math.abs(prevPos.x - newPos.x) ==0) {
      image1.stopDrag();
    }*/

    this.allElementGroup.add(rectangle);

    //   rectangle.y(Math.min(rectangle.y(), this.stage.height));

    this.stageLimite(rectangle);
    rectangle.on("dragstart", (e) => {
      this.stageLimite(rectangle);

      //   rectangle.y(Math.min(rectangle.y(), this.stage.height));
    });
    this.topage(rectangle);

    this.Info(rectangle);
  }

  clickShapToAddCanvas() {
    const element = document.getElementsByTagName("a");

    for (var i = 0; i < element.length; i++) {
      element[i].addEventListener("click", (e) => {
        e.preventDefault();
        const anchor = (e.target as HTMLDivElement).closest("span");
        if (!anchor) return;
        const nameElement = anchor.getAttribute("data-text");
        this.createShape(200, 50, nameElement);
      });
    }
  }

  dragShapToCanvas() {
    var nameElement;
    document
      .getElementById("listelement")
      .addEventListener("dragstart", (e) => {
        /*
        e.preventDefault();
        const anchor = (e.target as HTMLDivElement).closest("span");
        if (!anchor) return;
        nameElement = anchor.getAttribute("data-text");*/

        var name = (e.target as HTMLDivElement).getElementsByTagName("span");
        nameElement = name[0].dataset.text;
      });
    const con = this.stage.container(); //el stag win  yepointi
    con.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    con.addEventListener("drop", (e) => {
      e.preventDefault();
      this.stage.setPointersPositions(e);
      this.createShape(e.layerX, e.layerY, nameElement);
    });
  }

  domIncanvas() {
    let itemURL: any = "";
    document.getElementById("drag-items").addEventListener("dragstart", (e) => {
      itemURL = (e.target as HTMLImageElement).src;
    });

    const con = this.stage.container(); //el stag win  yepointi
    con.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    con.addEventListener("drop", (e) => {
      e.preventDefault();
      this.stage.setPointersPositions(e);

      Konva.Image.fromURL(itemURL, (image) => {
        console.log(image);
        this.layer.add(image);
        this.stageLimite(image);
        // this.Info(image);

        image.position(this.stage.getPointerPosition());
        image.draggable(true);
      });
    });
  }

  stageLimite(shape) {
    function getCorner(pivotX, pivotY, diffX, diffY, angle) {
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);

      /// find angle from pivot to corner
      angle += Math.atan2(diffY, diffX);

      /// get new x and y and round it off to integer
      const x = pivotX + distance * Math.cos(angle);
      const y = pivotY + distance * Math.sin(angle);

      return { x: x, y: y };
    }
    function getClientRect(rotatedBox) {
      const { x, y, width, height } = rotatedBox;
      const rad = rotatedBox.rotation;

      const p1 = getCorner(x, y, 0, 0, rad);
      const p2 = getCorner(x, y, width, 0, rad);
      const p3 = getCorner(x, y, width, height, rad);
      const p4 = getCorner(x, y, 0, height, rad);

      const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
      const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
      const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
      const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }

    function getTotalBox(boxes) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      boxes.forEach((box) => {
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
      });
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }

    this.tr.boundBoxFunc((oldBox, newBox) => {
      const box = getClientRect(newBox);
      const isOut =
        box.x < 0 ||
        box.y < 0 ||
        box.x + box.width > this.stage.width() ||
        box.y + box.height > this.stage.height();
      if (isOut) {
        return oldBox;
      }
      return newBox;
    });

    this.layer.add(this.tr);
    this.tr.anchorCornerRadius(10);
    // this.tr.anchorStroke("blue");
    this.tr.anchorStrokeWidth(2);
    this.tr.attachTo(shape);
    //tr.borderDash([2, 2]);//cadre dicheré
    //tr.borderEnabled(false);
    //  this.tr.borderStroke("blue");
    this.tr.borderStrokeWidth(2);
    //this.tr.centeredScaling(true);
    this.tr.rotateEnabled(false);
    this.tr.anchorSize(3);
    // this.tr.resizeEnabled(false);//resizeee enable

    //tr.detach(); //isolerrr transformer from layer
    /*tr.enabledAnchors([
  "top-left",
  "top-center",
  "top-right",
  "middle-right",
  "middle-left",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]);*/

    const nodes = this.tr.nodes();
    console.log(nodes);

    this.tr.on("dragmove", () => {
      shape.y(Math.max(shape.y(), 5));
      shape.x(Math.max(shape.x(), 5));
      const boxes = this.tr.nodes().map((node) => node.getClientRect());
      const box = getTotalBox(boxes);
      this.tr.nodes().forEach((shape) => {
        const absPos = shape.getAbsolutePosition();
        // where are shapes inside bounding box of all shapes?
        const offsetX = box.x - absPos.x;
        const offsetY = box.y - absPos.y;

        // we total box goes outside of viewport, we need to move absolute position of shape
        const newAbsPos = { ...absPos };
        if (box.x < 0) {
          newAbsPos.x = -offsetX;
        }
        if (box.y < 0) {
          newAbsPos.y = -offsetY;
        }
        if (box.x + box.width > this.stage.width()) {
          newAbsPos.x = this.stage.width() - box.width - offsetX;
        }
        if (box.y + box.height > this.stage.height()) {
          newAbsPos.y = this.stage.height() - box.height - offsetY;
        }
        shape.setAbsolutePosition(newAbsPos);
      });
    });
  }

  deleteShape(currentShape) {
    document.getElementById("delete-button").addEventListener("click", () => {
      currentShape.destroy();
      this.tr.nodes([]);
    });
    var nodes = this.layer.find(".1000");
    console.log(nodes);
  }

  /* pour  responsive stage 
 function fitStageIntoParentContainer() {
        var container = document.querySelector('#stage-parent');

        // now we need to fit stage into parent container
        var containerWidth = container.offsetWidth;

        // but we also make the full scene visible
        // so we need to scale all objects on canvas
        var scale = containerWidth / sceneWidth;

        stage.width(sceneWidth * scale);
        stage.height(sceneHeight * scale);
        stage.scale({ x: scale, y: scale });
      }

      fitStageIntoParentContainer();
      // adapt the stage on any window resize
      window.addEventListener('resize', fitStageIntoParentContainer);*/

  deleteUser(place: Placeholder, index: number) {
    if (this.placerholders.length > 1) {
      this.placerholders.splice(index, 1);
      console.log("hhhhhhhhhhé" + index);

      var nodes = this.layer.find(`.${place.idPlaceholder}`);
      for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index];
        element.destroy();
        this.tr.nodes([]);
      }
      this.selectedPlacerholder = this.placerholders[0];
    } else {
      this.msgError = "you need at least one placerholder to do this task";
      console.log();
    }
  }

  onClick() {
    /*var json = this.layer.toJSON();

    var nodes = this.layer.find(".1");
    nodes[0].draggable(false);
*/
    /*var nodes = this.layer.find(".1");
    nodes[0].hide();
*/
    /* var shape = this.layer.getIntersection({ x: 50, y: 50 });
    console.log(this.layer.toJSON());
    
  
    var nodes = this.layer.find("1000");

    console.log(nodes);
    
    this.t = !this.t;
    console.log(this.layer.listening(this.t));
   
    var shape = this.layer.getIntersection({ x: 50, y: 50 });
    console.log(this.layer.toJSON()); */
    var json = this.allElementGroup.toJSON();
    console.log(json);
    /* console.log(this.listofendpage);
    console.log(this.layer.getHitCanvas());*/
    console.log(this.placerholders);
  }
}
