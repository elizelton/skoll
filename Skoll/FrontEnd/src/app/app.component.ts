import { Component } from '@angular/core';

import { PoMenuItem, PoToolbarProfile } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    { label: 'Usuarios', link: '/usuarios' },
    // { label: 'Login', link: '/login' },
  ];

  profile: PoToolbarProfile = {
    avatar: '../assets/img/mail.png',
    subtitle: 'skoll.uepg@gmail.com',
    title: 'Skoll Adm'
  };
}
