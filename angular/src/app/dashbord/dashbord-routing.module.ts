import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { ChangeInfoService } from "../template/services/change-info.service";
import { CenterComponent } from "./components/center/center.component";
import { ChangepasswordComponent } from "./components/changepassword/changepassword.component";
import { ConsileprofileorgComponent } from "./components/consileprofileorg/consileprofileorg.component";
import { ConsileprofileuserComponent } from "./components/consileprofileuser/consileprofileuser.component";
import { ContactComponent } from "./components/contact/contact.component";
import { DashbordComponent } from "./components/dashbord/dashbord.component";
import { GestionGroupComponent } from "./components/gestion-group/gestion-group.component";
import { GestionOrgComponent } from "./components/gestion-org/gestion-org.component";
import { GestionUserComponent } from "./components/gestion-user/gestion-user.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

const routes: Routes = [
  {
    path: "",
    component: DashbordComponent,
    children: [
      {
        path: "",
        component: CenterComponent,
        data: { extraParameter: "" },
      },

      {
        path: "document",
        data: { extraParameter: " " },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../../app/document/document.module").then(
            (m) => m.DocumentModule
          ),
      },
      {
        path: "profileuser",
        data: { extraParameter: "" },
        canActivate: [AuthGuard],
        component: ConsileprofileuserComponent,
      },
      {
        path: "profileorg",
        data: { extraParameter: "" },
        canActivate: [AuthGuard],
        component: ConsileprofileorgComponent,
      },
      {
        path: "changepassword",
        data: { extraParameter: "" },
        canActivate: [AuthGuard],
        component: ChangepasswordComponent,
      },

      {
        path: "contact",
        data: { extraParameter: "" },
        canActivate: [AuthGuard],
        component: ContactComponent,
      },

      {
        path: "members",
        data: { roles: ["ADMIN"], extraParameter: "Teams" },
        canActivate: [AuthGuard],
        component: GestionUserComponent,
      },
      {
        path: "groups",
        data: { roles: ["ADMIN"], extraParameter: "Teams" },
        canActivate: [AuthGuard],
        component: GestionGroupComponent,
      },
      {
        path: "organization",
        data: { roles: ["ADMIN"], extraParameter: "Teams" },
        canActivate: [AuthGuard],
        component: GestionOrgComponent,
      },
      {
        path: "template",
        data: { extraParameter: "" },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../../app/template/template.module").then(
            (m) => m.TemplateModule
          ),
      },
      /*{path: 'document/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
        {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},},*/
    ],
  },

  {
    path: "sidebar",
    component: SidebarComponent,
    data: { extraParameter: "dashboardsMenu" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbordRoutingModule {
  constructor(private p: ChangeInfoService) {}
}
