import { Usuario } from './../../model/Usuario';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Usuario;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuarioEmmiter = new EventEmitter<Usuario>();
  constructor(private router: Router,
              private http: HttpClient) {
                this.usuario = new Usuario();
               }

   autenticarUsuario(form): boolean {

    this.usuario.login = form.login;
    this.usuario.senha = form.password;


    if (this.logarUsuario(this.usuario)) {
      this.mostrarMenuEmitter.emit(true);
      this.usuarioEmmiter.emit(this.usuario);
      this.router.navigate(['/']);
      return true;
    } else {
      this.mostrarMenuEmitter.emit(false);
      return false;
    }
  }

  logarUsuario(usuario: Usuario): Observable<boolean> {
    return this.http.post<Usuario>(`${environment.apiUrl}autenticacao`, usuario).pipe(
      tap(usuarioResponse => this.salvarSessao(usuarioResponse)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isUsuarioAutenticado(): boolean {
    return  !!this.getToken();
  }

  getUsuarioAutenticado(): Usuario {
    return this.usuario;
  }

  getToken() {
    return localStorage.getItem('tokenJWT');
  }

  salvarSessao(usuario: Usuario) {
    this.usuario = usuario;
    if (usuario.autenticado) {
      localStorage.setItem('tokenJWT', usuario.accessToken);
    }
  }
}
