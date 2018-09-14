import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';

@NgModule({
  imports: [
    CommonModule, SecurityRoutingModule
  ],
  declarations: [LoginComponent]
})
export class SecurityModule { }
