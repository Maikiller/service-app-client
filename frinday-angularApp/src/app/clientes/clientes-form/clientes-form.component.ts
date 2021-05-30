import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente'
import { ClientesService } from '../../clientes.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  atualizado!: boolean;
  alert_success: boolean = false;
  errors?: string[];
  fix_person!: string[];
  id!: Number;
  buscarErros?: string[];

  constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Params = this.activatedRoute.params;
    this.id = params['_value'].id;
    if (this.id) {
      this.service.getClienteById(this.id).subscribe(response => this.cliente = response, errorResponse => this.cliente = new Cliente());
    }
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.cliente).subscribe(response => {
        this.alert_success = true;
        this.errors = [];
        this.fix_person = [this.cliente.nome]
        this.atualizado = true;
      }, errorResponse => {

        this.errors = errorResponse.error.erros;
        this.alert_success = false;
      })
    } else {
      this.service.salvar(this.cliente).subscribe(response => {
        this.alert_success = true;
        this.errors = [];
        this.fix_person = [this.cliente.nome];
        this.cliente = response;
        this.atualizado = false;
        //console.log(this.cliente.dataCadastro + 'eqweq'); //Data de Cadastrado não funcionando
      }, errorResponse => {
        this.alert_success = false;
        this.errors = errorResponse.error.erros;
        //this.errors = ["ops ocorreu um errou !", "Nada ver irmão"];
        //console.log(errorResponse.error.erros)
      })
    }
  }

  public voltarListagem() {
    this.router.navigate(['/clientes-lista'])
  }
}
