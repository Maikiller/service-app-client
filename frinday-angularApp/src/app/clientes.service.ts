import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiUrl:String = environment.apiUrl + '/api/clientes';
  constructor(private http: HttpClient) { //setando informando para o API IP e PORTA
  }

  salvar(cliente: Cliente): Observable<Cliente> { // Observable<any>
    return this.http.post<Cliente>(`${this.apiUrl}`, cliente)
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`)
  }

  getClienteById(id: Number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente)
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<Cliente>(`${this.apiUrl}/${cliente.id}`)
  }
  /*getClientes(){
    let cliente = new Cliente();
    cliente.id = 1;
    cliente.nome = "maicon"
    cliente.dataCadastro = "2020"
    cliente.cpf = "1579525202454"
    return[cliente];
  }*/

}
