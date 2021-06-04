import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../login/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  cadastrando!: boolean;
  menssagemSuccess!: string;
  errors!: string[];
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    this.authService.tentarLogar(this.username, this.password).subscribe(response=>{
      const access_token = JSON.stringify(response)
      localStorage.setItem('access_token',access_token)
      this.router.navigate(['/home'])
    },errorResponse=>{
      this.errors=[' Usuário o senha incorretos']
    })
    
  }

  preparaCadastrar(event: any) {
    event.preventDefault();
    this.cadastrando = true;
    this.username = '';
    this.password = '';
    this.errors = [];
  }
  cancelarCadastrado() {
    this.cadastrando = false;
    this.username = '';
    this.password = '';
    this.errors = [];
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe(response => {
      this.menssagemSuccess = "Cadastro Criado com Sucesso! Efetue o Login"
      this.cadastrando = false;
      this.username = '';
      this.password = '';
      this.errors = [];
    }, errorResponse => {
      this.menssagemSuccess = '';
      this.errors = errorResponse.error.erros
    })
  }

}
