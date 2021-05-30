import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { servicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiUrl + "/api/servicos-prestados"

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: servicoPrestado): Observable<servicoPrestado> {
    return this.http.post<servicoPrestado>(this.apiURL, servicoPrestado);
  }
}
