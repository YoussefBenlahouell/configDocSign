import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Page1Component } from './components/page1/page1.component';

@NgModule({
  declarations: [WelcomeComponent, NavbarComponent, Page1Component],
  imports: [CommonModule, WelcomeRoutingModule],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
