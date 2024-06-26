import { Component, Input, Output } from "@angular/core";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-page-title",
  templateUrl: "./page-title.component.html",
  styleUrls: ["./page-title.component.sass"],
})
export class PageTitleComponent {
  faStar = faStar;
  faPlus = faPlus;

  @Input() heading;
  @Input() subheading;
  @Input() icon;
}
