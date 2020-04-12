import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  constructor(private router: Router) { }

   autenticarUsuario(form): boolean {
    if (form.login === 'skoll' && form.password === 'teste123') {

      localStorage['token'] = 'xptoh26410x5=50';

      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/home']);
      this.usuarioAutenticado = true;
      return true;
    } else {
      return false;
      this.mostrarMenuEmitter.emit(false);
    }
  }
}
