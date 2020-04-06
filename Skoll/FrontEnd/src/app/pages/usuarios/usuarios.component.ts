import { IUsuario } from 'src/app/model/Isuario.interface';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PoDynamicFormField, PoNotificationService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(http: HttpClient, private usuarioService: UsuarioService, public poNotification: PoNotificationService) { }

  items: Array<any>;
  a: any;
  usuario = { };

  usuarios: IUsuario[];

  rowActions = {
    beforeSave: this.onBeforeSave.bind(this),
    afterSave: this.onAfterSave.bind(this),
    beforeRemove: this.onBeforeRemove.bind(this),
    afterRemove: this.onAfterRemove.bind(this),
    beforeInsert: this.onBeforeInsert.bind(this)
  };

  columns = [
    { property: 'id', type: 'number', label: 'Código', align: 'right', readonly: true, freeze: true, width: 120 },
    { property: 'nome', label: 'Nome'},
    { property: 'login', label: 'Login' },
    { property: 'senha', visible: false},
    { property: 'situacao', type: 'boolean', width: '8%', labels: [
      { value: 'true', color: 'color-11', label: 'Ativo' },
      { value: 'false', color: 'color-08', label: 'Inativo' }
    ]},
    { property: 'actions', label: '.', align: 'center', readonly: true, action: true }
  ];

  fields: Array<PoDynamicFormField> = [
    // tslint:disable-next-line: max-line-length
    { property: 'nome', label: 'Nome Completo', divider: 'Cadastro de usuario', required: true, minLength: 4, maxLength: 50, gridColumns: 6, gridSmColumns: 12 },
    {property: 'login', required: true, minLength: 4, maxLength: 15, gridColumns: 6, gridSmColumns: 12 },
    {property: 'senha', required: true, secret: true, minLength: 4, maxLength: 15, gridColumns: 6, gridSmColumns: 12, pattern: '[a-zA]{5}[Z0-9]{3}', errorMessage: 'Pelo menos 3 numeros e 5 letras são nescessarias.'},
    // tslint:disable-next-line: max-line-length
    {property: 'situacao', type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo',  required: true, gridColumns: 3, gridSmColumns: 6 },
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

  onBeforeSave(row: any, old: any) {
    return row.occupation !== 'Engineer';
  }

  onAfterSave(row) {
    console.log('onAfterSave(new): ', row);
  }

  onBeforeRemove(row) {
    console.log('onBeforeRemove: ', row);

    return true;
  }

  onAfterRemove(row) {
    console.log('onAfterRemove: ', row);
  }

  onBeforeInsert(row) {
    console.log('onBeforeInsert: ', row);

    return true;
  }

  salvarForm(form: NgForm) {
   //  poNotification.success('Data saved successfully!');
   this.usuarioService.postUsuario(form.form.value).subscribe(
    response => {this.poNotification.success('Usuário ' + response.login.toString() + 'com sucesso!'); form.form.reset(); },
    err => {this.poNotification.error(err.error), form.form.controls.login.setErrors({'incorrect': true}); }
   );
  }

}
