import { Component, OnInit, ViewChild } from '@angular/core';
import { PoNotificationService, PoDynamicFormComponent, PoDynamicFormField } from '@portinari/portinari-ui';
import { UsuarioService } from '../usuarios/usuario.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario = {};
  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent;

  constructor(private usuarioService: UsuarioService,
    public poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute) { }

    id: String;
    titulo: String;

    fields: Array<PoDynamicFormField> = [
      // tslint:disable-next-line: max-line-length
      { property: 'nome', label: 'Nome Completo', divider: 'Cadastro de usuario', required: true, minLength: 4, maxLength: 50, gridColumns: 6, gridSmColumns: 12 },
      { property: 'login', required: true, minLength: 4, maxLength: 15, gridColumns: 6, gridSmColumns: 12 },
      { property: 'senha', required: true, secret: true, minLength: 4, maxLength: 15, gridColumns: 6, gridSmColumns: 12, pattern: '[a-zA]{5}[Z0-9]{3}', errorMessage: 'Pelo menos 3 numeros e 5 letras são nescessarias.' },
      // tslint:disable-next-line: max-line-length
      { property: 'situacao', type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo', required: true, gridColumns: 3, gridSmColumns: 6 },
    ];

  ngOnInit() {
    this.route.params.subscribe(
      params => this.id = params['id']
    );

    if ((this.id || '0') === '0') {
      this.titulo = 'Novo Usuário';
      this.usuario = {
        'id': 0,
        'situacao': true
      };

    } else {
      this.titulo = 'Edição de usuário';
      this.usuarioService.getUsuario(this.id).subscribe(
        result => this.usuario = result,
        error => this.poNotification.error(error)
      );
    }
  }

  onLoadFields(value: any) {
    return this.usuarioService.getUserDocument(value);
  }

  salvarForm(form: NgForm) {
    //  poNotification.success('Data saved successfully!');

    if (this.dynamicForm.value.id === 0) {
      this.usuarioService.postUsuario(form.form.value).subscribe(
        response => { this.poNotification.success('Usuário ' + response.login.toString() + ' com sucesso!'); form.form.reset(); },
        err => {
          this.poNotification.error(err.error),
            this.dynamicForm.focus('login'),
            this.dynamicForm.form.controls['login'].setErrors({ 'incorrect': true });
        }
      );
    } else {
      this.usuarioService.editarUsuario(this.dynamicForm.value.id, this.dynamicForm.value).subscribe(
        () => { this.poNotification.success(`Usuário ${this.dynamicForm.value.login} com sucesso!`); this.router.navigate(['/usuarios']); },
        err => {
          this.poNotification.error(err.error),
            this.dynamicForm.focus('login'),
            this.dynamicForm.form.controls['login'].setErrors({ 'incorrect': true });
        }
      );
    }
  }
}
