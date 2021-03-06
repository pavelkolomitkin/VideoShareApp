import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SecurityRoutingModule
    ],
    exports: [
        FormsModule
    ]
})
export class SecurityModule { }
