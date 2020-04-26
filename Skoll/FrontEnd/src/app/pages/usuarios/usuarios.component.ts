import { IUsuario } from '../../model/IUsuario.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { PoDynamicFormField, PoNotificationService, PoDynamicFormComponent, PoTableColumn, PoTableAction, PoDialogService } from '@portinari/portinari-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(http: HttpClient,
    private usuarioService: UsuarioService,
    public poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router) { }

  items: Array<any>;
  usuario = {};
  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent;
  usuarios: IUsuario[];

  columns: Array<PoTableColumn> = [
    { property: 'id', type: 'number', label: 'Código', width: '10%' },
    { property: 'nome', label: 'Nome' },
    { property: 'login', label: 'Login' },
    { property: 'senha', visible: false },
    {
      property: 'situacao', type: 'boolean', width: '8%', boolean: {
        trueLabel: 'Ativo', falseLabel: 'Inativo'
      }
    },
  ];

  actions: Array<PoTableAction> = [
    { action: this.editarUsuario.bind(this), icon: 'po-icon-edit', label: 'Editar' },
    { action: this.excluirUsuarioDialog.bind(this), icon: 'po-icon-delete', label: 'Excluir' }
  ];


  ngOnInit() {
    this.usuarioService.getUsuarios()
      .subscribe(result => {
        this.usuarios = result;
      }, error => this.poNotification.error(error));

  }
  onLoadFields(value: any) {
    return this.usuarioService.getUserDocument(value);
  }

  editarUsuario(usuario: IUsuario) {
    this.router.navigate(['/usuario/' + usuario.id]);
  }

  excluirUsuarioDialog(usuario: IUsuario) {
    this.poDialog.confirm({
      title: 'Atenção',
      message: `Você deseja excluir o usuario: ${usuario.login} ?`,
      confirm: () => { this.excluirUsuario(usuario.id); },
      cancel: () => { }
    });
  }

  excluirUsuario(usuarioID: Number) {
    this.usuarioService.excluirUsuario(usuarioID).subscribe(
      response => { this.poNotification.success('Usuário excluido com sucesso!');
      this.usuarioService.getUsuarios()
      .subscribe(result => {
        this.usuarios = result;
      }, error => this.poNotification.error(error));
    },
      err => { console.log(err.error); }
    );
  }

  novoUsuario() {
    this.router.navigate(['/usuario/0']);
  }
}
