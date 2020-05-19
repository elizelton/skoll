import { InterceptorModule } from './auth/interceptor/interceptor.module';
import { LoginService } from './pages/login/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PoModule } from '@portinari/portinari-ui';
import { PoTemplatesModule } from '@portinari/portinari-templates';
import { PagesModule } from './pages/pages.module';
import { AppRountingModule } from './app.routing.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    InterceptorModule,
    PoModule,
    PoTemplatesModule,
    PagesModule,
    AppRountingModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorModule,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
