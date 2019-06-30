import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { JwtInterceptor, ErrorInterceptor } from './helper';
import { DefaultLayoutComponent, NoNavLayoutComponent } from './layout';
import { LoginComponent, RegisterComponent, HomeComponent, ProfileComponent } from './component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NoNavLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}