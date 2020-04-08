import { IUsuario } from './../../model/Isuario.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PoDynamicFormField, PoNotificationService, PoDynamicFormComponent, PoTableColumn, PoTableAction, PoDialogService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(http: HttpClient,
    private usuarioService: UsuarioService,
    public poNotification: PoNotificationService,
    private poDialog: PoDialogService) { }

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

  fields: Array<PoDynamicFormField> = [
    // tslint:disable-next-line: max-line-length
    { property: 'nome', label: 'Nome Completo', divider: 'Cadastro de usuario', required: true, minLength: 4, maxLength: 50, gridColumns: 6, gridSmColumns: 12 },
    { property: 'login', required: true, minLength: 4, maxLength: 15, gridColumns: 6, gridSmColumns: 12 },
    { property: 'senha', required: true, secret: true, minLength: 4, maxLength: 15, gridColumns: 6, gridSmColumns: 12, pattern: '[a-zA]{5}[Z0-9]{3}', errorMessage: 'Pelo menos 3 numeros e 5 letras são nescessarias.' },
    // tslint:disable-next-line: max-line-length
    { property: 'situacao', type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo', required: true, gridColumns: 3, gridSmColumns: 6 },
  ];

  ngOnInit() {
    this.usuarioService.getUsuarios()
      .subscribe(result => {
        this.usuarios = result;
      }, error => this.poNotification.error(error));

    this.usuario = {
      'situacao': true,
      'nome': 'Elizelton',
      'login': 'Elizelton',
      'senha': 'teste123'
    };
  }
  onLoadFields(value: any) {
    return this.usuarioService.getUserDocument(value);
  }
  salvarForm(form: NgForm) {
    //  poNotification.success('Data saved successfully!');

    if (this.dynamicForm.value.id === 0) {
      this.usuarioService.postUsuario(form.form.value).subscribe(
        response => { this.poNotification.success('Usuário ' + response.login.toString() + 'com sucesso!'); form.form.reset(); },
        err => {
          this.poNotification.error(err.error),
            this.dynamicForm.focus('login'),
            this.dynamicForm.form.controls['login'].setErrors({ 'incorrect': true });
        }
      );
    } else {
      this.usuarioService.editarUsuario(this.dynamicForm.value.id, this.dynamicForm.value).subscribe(
        response => { this.poNotification.success('Usuário ' + response.login.toString() + 'com sucesso!'); form.form.reset(); },
        err => {
          this.poNotification.error(err.error),
            this.dynamicForm.focus('login'),
            this.dynamicForm.form.controls['login'].setErrors({ 'incorrect': true });
        }
      );
    }
  }

  editarUsuario(usuario: IUsuario) {
    this.usuario = usuario;
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
}
