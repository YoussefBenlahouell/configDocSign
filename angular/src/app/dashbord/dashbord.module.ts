import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashbordRoutingModule } from "./dashbord-routing.module";
import { DashbordComponent } from "./components/dashbord/dashbord.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ChartsModule } from "ng2-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { CenterComponent } from "./components/center/center.component";
import { UserBoxComponent } from "./components/header/elements/user-box/user-box.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ContactComponent } from "./components/contact/contact.component";
import { PageTitleComponent } from "./components/page-title/page-title.component";
import { GestionUserComponent } from "./components/gestion-user/gestion-user.component";
import { GestionGroupComponent } from "./components/gestion-group/gestion-group.component";
import { GestionOrgComponent } from "./components/gestion-org/gestion-org.component";
import { ConsileprofileuserComponent } from "./components/consileprofileuser/consileprofileuser.component";
import { ConsileprofileorgComponent } from "./components/consileprofileorg/consileprofileorg.component";
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [
    DashbordComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CenterComponent,
    UserBoxComponent,
    ContactComponent,
    PageTitleComponent,
    GestionUserComponent,
    GestionGroupComponent,
    GestionOrgComponent,
    ConsileprofileuserComponent,
    ConsileprofileorgComponent,
    ChangepasswordComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    LoadingBarRouterModule,
    CommonModule,
    DashbordRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    PerfectScrollbarModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Charts

    ChartsModule,
  ],
  exports: [DashbordComponent],
})
export class DashbordModule {}
