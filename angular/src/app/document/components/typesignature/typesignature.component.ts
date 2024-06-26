import { Component, OnInit, EventEmitter, Output } from "@angular/core";
@Component({
  selector: "app-typesignature",
  templateUrl: "./typesignature.component.html",
  styleUrls: ["./typesignature.component.scss"],
})
export class TypesignatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  advanced() {}
  qualified() {}
  @Output() addi = new EventEmitter<any>();

  next() {
    this.addi.emit(1);
  }
}
