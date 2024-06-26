import { Component, OnInit } from "@angular/core";
import { Placeholder } from "../../models/placeholder";

import { Output, EventEmitter } from "@angular/core";
import * as uuid from "uuid";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeInfoService } from "../../services/change-info.service";
@Component({
  selector: "app-placeholder-property",
  templateUrl: "./placeholder-property.component.html",
  styleUrls: ["./placeholder-property.component.css"],
})
export class PlaceholderPropertyComponent implements OnInit {
  constructor(private changeInfo: ChangeInfoService) {}
  isempty = false;
  placerholders: Placeholder[] = [];
  //  @Output() addPlaceholderOut = new EventEmitter<Placeholder>();
  //  @Output() deletePlaceholderOut = new EventEmitter<number>();
  @Output() addi = new EventEmitter<number>();
  @Output() deletei = new EventEmitter<number>();
  ngOnInit(): void {
    this.placerholders = this.changeInfo.placeholders;
  }
  addRole() {
    const placeholder: Placeholder = {
      idPlaceholderBack: null,
      idPlaceholder: uuid.v4(),
      namePlaceholder: null,
      colorPlaceholder:
        "#" +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        "7F",
      typePlaceholder: "needSign",
      elements: [],
      template: null,
      nameRecipient: null,
      emailRecipient: null,
      orderPlaceholder: null,
      isvisible: true,
      phoneRecipient: null,
      orgRecipient: null,
    };
    this.placerholders.push(placeholder);
    // this.addPlaceholderOut.emit(placeholder);
  }

  deleteRole(index: number) {
    this.placerholders.splice(index, 1);
    //  this.deletePlaceholderOut.emit(index);
  }
  valuechangeNamePlaceholder(placename, index) {
    this.placerholders[index].namePlaceholder = placename;
    console.log(placename);
  }
  valuechangeNameRecipient(placename, index) {
    this.placerholders[index].nameRecipient = placename;
    console.log(placename);
  }
  valuechangeEmailRecipient(placename, index) {
    this.placerholders[index].emailRecipient = placename;
    console.log(placename);
  }

  prior() {
    this.deletei.emit(1);
  }
  next() {
    this.isempty = false;

    this.placerholders.forEach((e) => {
      console.log(e);
      if (e.namePlaceholder == null || e.namePlaceholder == "") {
        this.isempty = true;
      }
    });
    console.log(this.isempty);

    if (this.placerholders.length > 0 && !this.isempty) {
      let i: number = 0;
      this.placerholders.forEach((placeholder) => {
        i++;
        placeholder.orderPlaceholder = i;
      });
      console.log(this.placerholders);
      this.changeInfo.placeholders = this.placerholders;
      this.addi.emit(1);
    }
  }

  radioChange(type, index) {
    this.placerholders[index].typePlaceholder = type;
    console.log(type);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.placerholders,
      event.previousIndex,
      event.currentIndex
    );
  }
}
