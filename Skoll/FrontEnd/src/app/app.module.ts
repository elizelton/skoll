import { LoginService } from './pages/login/login.service';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PoModule } from '@portinari/portinari-ui';
import { PoTemplatesModule } from '@portinari/portinari-templates';
import { PagesModule } from './pages/pages.module';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent},
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
      { path: 'usuario/:id', component: UsuarioComponent, canActivate: [AuthGuard] },
    ]),
    PoModule,
    PoTemplatesModule,
    PagesModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
