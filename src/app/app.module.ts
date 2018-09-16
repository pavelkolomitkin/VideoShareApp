import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';


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
import {LocalStorageService} from './services/local-storage.service';
import {MapModule} from './map/map.module';
import {appInitializeHandler, AppInitializerService} from './services/app-initializer.service';
import {ProfileModule} from './profile/profile.module';

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
      MapModule,
      ProfileModule,
      StoreDevtoolsModule.instrument(
          {
              maxAge: 25, // Retains last 25 states
              logOnly: isDevMode(), // Restrict extension to log-only mode
          }
      ),
    EffectsModule.forRoot([SecurityEffects]) // TODO move to security module!!!
  ],
  providers: [
      httpInterceptorProviders,
      LocalStorageService,
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
