import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { servicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment'
import { ServicoPrestadoBuscar } from './servico-prestado/servico-prestado-lista/servicoPrestadoBuscar';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiUrl + "/api/servicos-prestados"

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: servicoPrestado): Observable<servicoPrestado> {
    return this.http.post<servicoPrestado>(this.apiURL, servicoPrestado);
  }

  buscar(nome: string, mes: number): Observable<ServicoPrestadoBuscar[]> {
    const httpParams = new HttpParams().set("nome", nome).set("mes", mes ? mes.toString() : '');
    const url = this.apiURL + "?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url)
  }
}
