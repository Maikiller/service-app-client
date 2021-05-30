import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service'
import { Router } from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes?: Cliente[];
  clienteSelecionado!: Cliente;
  messagemSuccesso?: string;
  messagemError?: string;

  constructor(private service: ClientesService, private router: Router) { }

  ngOnInit(): void {
    //this.clientes = this.service.getClientes();
    this.service.getClientes().subscribe(resposta => this.clientes = resposta)

  }

  novoCadastro() {
    this.router.navigate(['/clientes-form'])
  }
  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    //console.log(this.clienteSelecionado)
    this.service.deletar(this.clienteSelecionado).subscribe(response => { this.messagemSuccesso = 'Cliente [' + this.clienteSelecionado.id + ']' + ' ' + this.clienteSelecionado.nome + ' deletetado com sucesso', this.ngOnInit() }, error => this.messagemError = 'Ocorreu um error ao deletar o' + this.clienteSelecionado.nome)
  }
}
