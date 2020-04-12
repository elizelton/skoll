import { LoginService } from './pages/login/login.service';
import { Component } from '@angular/core';

import { PoMenuItem, PoToolbarProfile } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logo = '../assets/img/mail.png';

  mostrarMenu = false;
  
  readonly menus: Array<PoMenuItem> = [
    {  label: 'Home', icon: 'po-icon-home', link: '/'},
    { label: 'Usuários', icon: 'po-icon-users', shortLabel: 'Usuários', subItems: [
      { label: 'Novo Usuário', icon: 'po-icon-plus', link: '/usuario/0' },
      { label: 'Listar Usuários', icon: 'po-icon-list', link: '/usuarios' }
    ]}
  ];

  profile: PoToolbarProfile = {
    avatar: '../assets/img/mail.png',
    subtitle: 'skoll.uepg@gmail.com',
    title: 'Skoll Adm'
  };
  printMenuAction() {}

  constructor(private loginService: LoginService) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
     this.loginService.mostrarMenuEmitter.subscribe(
        m => this.mostrarMenu = m
     );
  }
}
