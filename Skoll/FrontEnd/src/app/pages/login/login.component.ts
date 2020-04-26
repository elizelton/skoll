import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { PoPageLogin } from '@portinari/portinari-templates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErrors = [];
  passwordErrors = [];

  constructor(private router: Router,
      private loginService: LoginService) { }

  ngOnInit() {
  }


  autenticarUsuario(form: PoPageLogin) {
   if (!this.loginService.autenticarUsuario(form)) {
    this.passwordErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
    this.loginErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
   }
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
