import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
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
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from './services/local-storage.service';
import {appInitializeHandler, AppInitializerService} from './services/app-initializer.service';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VideoEffects} from './effects/video.effects';
import {VideoService} from './services/video.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SecurityService} from './security/services/SecurityService';
import {SecurityEffects} from './security/effects/security.effects';

const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
      BrowserAnimationsModule,
      NgbModalModule.forRoot(),
      NgbDropdownModule.forRoot(),
    StoreModule.forRoot(reducer),

    HttpClientModule,
      AppRoutingModule,
      StoreDevtoolsModule.instrument(
          {
              maxAge: 25,
              logOnly: isDevMode()
          }
      ),
    EffectsModule.forRoot([VideoEffects, SecurityEffects])
  ],
  providers: [
      httpInterceptorProviders,
      LocalStorageService,
      VideoService,
      SecurityService,
      AppInitializerService,
      {
          provide: APP_INITIALIZER,
          useFactory: appInitializeHandler,
          deps: [AppInitializerService],
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
