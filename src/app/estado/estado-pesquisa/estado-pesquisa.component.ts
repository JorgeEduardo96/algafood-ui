import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { EstadoService } from '../estado.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-estado-pesquisa',
  templateUrl: './estado-pesquisa.component.html',
  styleUrls: ['./estado-pesquisa.component.css']
})
export class EstadoPesquisaComponent implements OnInit {

  estados: any[] = [];

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private estadoService: EstadoService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa - Estados');
    this.listar();
  }

  novoEstado() {
    this.router.navigate(['/estados/novo']);
  }

  listar() {
    this.estadoService.listar().subscribe({
      next: (response) => {
        this.estados = response._embedded['estados'];
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  confirmarExclusao(estado: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(estado);
      }
    });
  }

  excluir(estado: any) {
    this.estadoService.excluir(estado.id).subscribe({
      complete: () => {
        this.estados = this.estados.filter(val => val.id !== estado.id).slice();
        this.messageService.add({ severity: 'success', detail: 'Grupo excluído com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

}
