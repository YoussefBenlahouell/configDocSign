import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "dashbord",
    data: { roles: ["MEMBER"] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../app/dashbord/dashbord.module").then((m) => m.DashbordModule),
  },

  {
    path: "signature",
    loadChildren: () =>
      import("../app/signature/signature.module").then(
        (m) => m.SignatureModule
      ),
  },
  {
    path: "template",
    data: { roles: ["MEMBER"] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../app/template/template.module").then((m) => m.TemplateModule),
  },
  {
    path: "document",
    data: { roles: ["MEMBER"] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../app/document/document.module").then((m) => m.DocumentModule),
  },
  {
    path: "admin",
    data: { roles: ["ADMIN"] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../app/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("../app/welcome/welcome.module").then((m) => m.WelcomeModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../app/user/user.module").then((m) => m.UserModule),
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
