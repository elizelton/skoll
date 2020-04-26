import { Usuario } from 'src/app/model/Usuario';
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
  usuario: Usuario;
  mostrarMenu = false;

  readonly menus: Array<PoMenuItem> = [
    {  label: 'Home', icon: 'po-icon-home', link: '/'},
    { label: 'Pessoas', icon: 'po-icon-users', subItems: [
      { label: 'Clientes', icon: 'po-icon-user', shortLabel: 'Clientes', subItems: [
        { label: 'Novo Cliente', icon: 'po-icon-plus', link: '/cliente/0' },
        { label: 'Listar Clientes', icon: 'po-icon-list', link: '/clientes' }
      ]},
      { label: 'Fornecedores', icon: 'po-icon-truck', shortLabel: 'Fornecedores', subItems: [
        { label: 'Novo Fornecedor', icon: 'po-icon-plus', shortLabel: 'Novo Fornecedor', link: '/fornecedor/0' },
        { label: 'Listar Fornecedores', icon: 'po-icon-list', link: '/fornecedores' }
      ]},
      { label: 'Usuários', icon: 'po-icon-users', shortLabel: 'Usuários', subItems: [
        { label: 'Novo Usuário', icon: 'po-icon-plus', link: '/usuario/0' },
        { label: 'Listar Usuários', icon: 'po-icon-list', link: '/usuarios' }
      ]}
    ]},
    {  label: 'Contratos', icon: 'po-icon-document-filled'},
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
     this.loginService.usuarioEmmiter.subscribe(
       u => this.usuario = u
     );
  }
}
