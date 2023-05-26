import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UsuarioService } from '../usuario.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  usuarios: any[] = [];

  constructor(
    private errorHandler: ErrorHandlerService,
    private usuarioService: UsuarioService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa - Usuários');
    this.listar();
  }

  novoUsuario() {
    this.router.navigate(['/usuarios/novo'])
  }

  listar() {
    this.usuarioService.listar().subscribe({
      next: (response) => {
        console.log(response);
        this.usuarios = response._embedded['usuarios'];
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

}
