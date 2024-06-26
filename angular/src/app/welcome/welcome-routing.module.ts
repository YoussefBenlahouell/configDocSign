import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Page1Component } from "./components/page1/page1.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "page1", component: Page1Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
