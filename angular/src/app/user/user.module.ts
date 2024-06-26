import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./components/user/user.component";
import { SignuptestComponent } from "./components/signuptest/signuptest.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SigninComponent } from "./components/signin/signin.component";
import { ContactComponent } from "./components/contact/contact.component";

@NgModule({
  declarations: [
    UserComponent,
    SignuptestComponent,
    SigninComponent,
    ContactComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    CommonModule,
    NgbModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
