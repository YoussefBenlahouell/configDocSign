import { Component, HostListener, OnInit } from "@angular/core";
import { ThemeOptions } from "../../../theme-options";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ChangeInfoService } from "src/app/template/services/change-info.service";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  isadmin: Boolean = false;
  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    private changeInfoService: ChangeInfoService,
    public securityservice: KeyclockSecurityService
  ) {}

  @select("config") public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = "dashboardsMenu";

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    setTimeout(() => {
      if (
        this.securityservice.kc.tokenParsed.realm_access.roles.includes("ADMIN")
      )
        this.isadmin = true;
      else if (
        this.securityservice.kc.tokenParsed.realm_access.roles.includes(
          "MEMBER"
        )
      )
        this.isadmin = false;
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter =
      this.activatedRoute.snapshot.firstChild.data.extraParameter;
    console.log("    console.log(this.activatedRoute.children);");
    console.log(this.activatedRoute.children);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
  }
  test() {
    console.log("teeeeeeeeeeeest");
  }
}
