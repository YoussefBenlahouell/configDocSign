import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-form-for-certif",
  templateUrl: "./form-for-certif.component.html",
  styleUrls: ["./form-for-certif.component.sass"],
})
export class FormForCertifComponent implements OnInit {
  @Output() addi = new EventEmitter<number>();
  checkoutForm = this.formBuilder.group({
    idMail: null,
    subjectMail: "yyyyyyyyyyy",
    messageMail: "tttttttttttttt",
    reminderEnabled: false,
    reminderDelay: 0,
  });

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.checkoutForm.value);
    this.addi.emit(1);
  }
}
