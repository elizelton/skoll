import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PoModule } from '@portinari/portinari-ui';
import { PoTemplatesModule } from '@portinari/portinari-templates';
import { UsuarioComponent } from './usuario/usuario.component';




@NgModule({
  declarations: [LoginComponent, UsuariosComponent, UsuarioComponent],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
}
)
export class PagesModule { }
