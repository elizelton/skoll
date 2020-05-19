import { Router } from '@angular/router';
import { Usuario } from './../../model/Usuario';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { PoPageLogin } from '@portinari/portinari-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErrors = [];
  passwordErrors = [];
  usuario = new Usuario();

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }


  autenticarUsuario(form: PoPageLogin) {

    this.usuario.login = form.login;
    this.usuario.senha = form.password;

    this.loginService.logarUsuario(this.usuario).subscribe(
      (      res: Usuario) => {
        this.loginService.salvarSessao(res);
        this.router.navigate(['/']);
      },
      error => {
        this.passwordErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
        this.loginErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
      }
    );
  }

  passwordChange() {
    if (this.passwordErrors.length) {
      this.passwordErrors = [];
    }
  }

  loginChange() {
    if (this.loginErrors.length) {
      this.loginErrors = [];
    }
  }

}
