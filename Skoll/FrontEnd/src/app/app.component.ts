import { Usuario } from 'src/app/model/Usuario';
import { LoginService } from './pages/login/login.service';
import { Component } from '@angular/core';

import { PoMenuItem, PoNotificationService, PoToolbarAction, PoToolbarProfile, PoDialogService } from '@portinari/portinari-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logo = '../assets/img/mail.png';
  usuario = new Usuario();
  mostrarMenu = false;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', icon: 'po-icon-home', link: '/' },
    {
      label: 'Pessoas', icon: 'po-icon-users', subItems: [
        { label: 'Clientes', icon: 'po-icon-user', shortLabel: 'Clientes', link: '/clientes' },
        { label: 'Fornecedores', icon: 'po-icon-truck', shortLabel: 'Fornecedores', link: '/fornecedores' },
        { label: 'Usuários', icon: 'po-icon-users', shortLabel: 'Usuários', link: '/usuarios' }
      ]
    },
    { label: 'Contratos', icon: 'po-icon-document-filled' },
    { label: 'Relatórios', icon: 'po-icon-pdf' },
  ];

  profile: PoToolbarProfile = {
    avatar: '../assets/img/mail.png',
    subtitle: this.usuario.nome,
    title: this.usuario.login
  };
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-user', label: 'Dados do Usuario', action: item => this.showAction() },
    { icon: 'po-icon-settings', label: 'Configurações', action: item => this.showAction() },
    { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: item => this.deslogar() }
  ];

  notificationActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-news',
      label: 'PO news, stay tuned!',
      type: 'danger',
      action: item => this.onClickNotification(item)
    },
    { icon: 'po-icon-message', label: 'New message', type: 'danger', action: item => this.openDialog(item) }
  ];
  constructor(private loginService: LoginService,
    private poDialog: PoDialogService,
    private router: Router) {

  }

  showAction() { }

  deslogar() {
    this.loginService.apagarSessao();
    this.router.navigate(['/login']);
    this.mostrarMenu = false;
  }

  getNotificationNumber() {
    return this.notificationActions.filter(not => not.type === 'danger').length;
  }

  onClickNotification(item: PoToolbarAction) {
    window.open('https://github.com/po-ui/po-angular/blob/master/CHANGELOG.md', '_blank');

    item.type = 'default';
  }

  openDialog(item: PoToolbarAction) {
    this.poDialog.alert({
      title: 'Bem vindo',
      message: `Hello Mr. Dev! Congratulations, you are a TOTVER!`,
      ok: undefined
    });

    item.type = 'default';
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.loginService.mostrarMenuEmitter.subscribe(
      m => this.mostrarMenu = m
    );
    this.mostrarMenu = this.loginService.isUsuarioAutenticado();
    this.usuario = this.loginService.getUsuarioLogado();
  }
}
