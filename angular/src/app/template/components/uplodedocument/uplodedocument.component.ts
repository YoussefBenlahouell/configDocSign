import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { UploadFileService } from "../../services/upload-file.service";
import { ChangeInfoService } from "../../services/change-info.service";
@Component({
  selector: "app-uplodedocument",
  templateUrl: "./uplodedocument.component.html",
  styleUrls: ["./uplodedocument.component.scss"],
})
export class UplodedocumentComponent implements OnInit {
  errormsg: boolean = false;
  fromold: boolean = false;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = "";
  fileInfos: Observable<any>;
  constructor(
    private uploadService: UploadFileService,
    private changeInfoService: ChangeInfoService
  ) {}
  @Output() addi = new EventEmitter<number>();
  @Output() deletei = new EventEmitter<number>();
  files: any[] = [];
  filesafternext: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    /*console.log(this.files[index].fileInfos);
    this.files.splice(index, 1);
    this.changeInfoService.deletePdf(index);*/
    this.files = [];
    this.changeInfoService.pdfUplodedList = [];
  }

  /**
   * Simulate the upload process
   */

  uploadFilesSimulator(index: number) {
    this.errormsg = false;
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.uploadService.upload(this.files[index]).subscribe(
              (event) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.files[index].progress = Math.round(
                    (100 * event.loaded) / event.total
                  );
                } else if (event instanceof HttpResponse) {
                  this.files[index].message = event.body.message;
                  this.files[index].fileInfos = this.uploadService.getFiles();

                  console.log("event.body.result");
                  console.log(event.body.result);
                  this.filesafternext.push(event.body.result);
                }
              },
              (err) => {
                this.files[index].progress = 0;
                this.files[index].message = "Could not upload the file!";
              }
            );
          }
        }, 200);
      }
    }, 1000);
    console.log(this.files);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  //////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    this.files = this.changeInfoService.pdfUplodedList;
    console.log(this.files);
  }

  prior() {
    this.deletei.emit(1);
  }
  next() {
    console.log(this.filesafternext);
    if (this.filesafternext.length != 0)
      this.changeInfoService.pdfUplodedList = this.filesafternext;
    if (this.changeInfoService.pdfUplodedList.length == 0) this.errormsg = true;
    else this.addi.emit(1);
  }

  fromOldDocument() {
    console.log(this.fileInfos);
    this.fromold = !this.fromold;
  }
  addfilefromold($event) {
    console.log(this.filesafternext);

    // let x = this.uploadService.getFile2($event.idfile);

    this.filesafternext.push($event);
  }
}
