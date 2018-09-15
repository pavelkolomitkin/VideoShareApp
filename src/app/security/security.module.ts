import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {SecurityEffects} from './effects/security.effects';
import {SecurityService} from './services/SecurityService';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SecurityRoutingModule,
        //EffectsModule.forFeature([SecurityEffects])
    ],
    exports: [
        FormsModule
    ],
    providers: [
        SecurityService
    ]
})
export class SecurityModule { }
