import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/model/IUsuario.interface';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<IUsuario>  {

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string)  {

    super(http,
      `${baseUrl}api/usuario`);
  }

  getUserDocument(value) {
    return {
      fields: [ document ]
    };
  }
}
