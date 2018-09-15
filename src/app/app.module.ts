import { BrowserModule } from '@angular/platform-browser';
import {isDevMode, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
import {SecurityModule} from './security/security.module';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {DefaultHttpHeadersInterceptor} from './services/interceptors/default-http-headers.interceptor';
import {AuthTokenInjectorInterceptor} from './services/interceptors/auth-token-injector.interceptor';
import {BaseApiUrlInterceptor} from './services/interceptors/base-api-url.interceptor';
import {EffectsModule} from '@ngrx/effects';
import {SecurityEffects} from './security/effects/security.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CommonModule} from '@angular/common';

const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot(reducer),

    HttpClientModule,
    AppRoutingModule,
    SecurityModule,
      StoreDevtoolsModule.instrument(
          {
              maxAge: 25, // Retains last 25 states
              logOnly: true, // Restrict extension to log-only mode
          }
      ),
    EffectsModule.forRoot([SecurityEffects]) // TODO move to security module!!!
  ],
  providers: [
      httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
