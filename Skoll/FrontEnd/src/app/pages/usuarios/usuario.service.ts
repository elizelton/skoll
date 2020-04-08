import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/model/Isuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = this.baseUrl + 'api/usuario' ;

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)  { }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUrl);
  }

  postUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiUrl, usuario, this.httpOptions);
  }

  editarUsuario(usuarioID: string, usuario: IUsuario): Observable<IUsuario> {
    const apiurl = `${this.apiUrl}/${usuarioID}`;
    return this.http.put<IUsuario>(apiurl, usuario, this.httpOptions);
  }

  excluirUsuario(usuarioID: Number): Observable<Number> {
    const apiurl = `${this.apiUrl}/${usuarioID}`;
    return this.http.delete<number>(apiurl, this.httpOptions);
  }

  getUserDocument(value) {
    return {
      fields: [ document ]
    };
  }
}
