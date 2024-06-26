import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./components/contact/contact.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignuptestComponent } from "./components/signuptest/signuptest.component";
import { UserComponent } from "./components/user/user.component";

const routes: Routes = [
  { path: "", component: SigninComponent },
  { path: "signuptest", component: SignuptestComponent },
  { path: "contact", component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
