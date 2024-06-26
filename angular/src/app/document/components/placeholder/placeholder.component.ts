import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from "@angular/core";

import { NgxExtendedPdfViewerService } from "ngx-extended-pdf-viewer";
@Component({
  selector: "app-placeholder",
  templateUrl: "./placeholder.component.html",
  styleUrls: ["./placeholder.component.css"],
})
export class PlaceholderComponent {
  movies = [
    {
      name: "Episode I - The Phantom Menace",
      isDisable: false,
    },
    {
      name: "Episode II - Attack of the Clones",
      isDisable: false,
    },
    {
      name: "Episode III - Revenge of the Sith",
      isDisable: false,
    },
    {
      name: "Episode IV - A New Hope",
      isDisable: false,
    },
    {
      name: "Episode V - The Empire Strikes Back",
      isDisable: false,
    },
    {
      name: "Episode VI - Return of the Jedi",
      isDisable: false,
    },
  ];

  delete(index: any) {
    this.movies.splice(index, 1);
  }

  addNew() {
    this.movies.push({
      name: "new item",
      isDisable: false,
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
