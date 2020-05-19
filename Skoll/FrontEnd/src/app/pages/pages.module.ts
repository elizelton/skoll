import { AuthGuard } from './../guards/auth.guard';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@portinari/portinari-ui';
import { PoTemplatesModule } from '@portinari/portinari-templates';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios/:id',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    UsuarioComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
}
)
export class PagesModule { }
