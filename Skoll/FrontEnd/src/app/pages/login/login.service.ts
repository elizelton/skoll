import { Usuario } from './../../model/Usuario';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Usuario;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  constructor(private router: Router,
              private http: HttpClient) {
                this.usuario = new Usuario();
               }

  logarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}autenticacao`, usuario);
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

  getUsuarioLogado(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
  }

  apagarSessao() {
    localStorage.removeItem('tokenJWT');
    localStorage.removeItem('usuarioLogado');
  }

  salvarSessao(usuario: Usuario) {
    this.mostrarMenuEmitter.emit(true);
    this.usuario = usuario;
    if (usuario.autenticado) {
      localStorage.setItem('tokenJWT', usuario.accessToken);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }
  }
}
