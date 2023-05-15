import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { GrupoService } from '../grupo.service';

@Component({
  selector: 'app-grupo-pesquisa',
  templateUrl: './grupo-pesquisa.component.html',
  styleUrls: ['./grupo-pesquisa.component.css']
})
export class GrupoPesquisaComponent implements OnInit {

  grupos: any[] = [];

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private grupoService: GrupoService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa - Grupos');
    this.listar();
  }

  novoGrupo() {
    this.router.navigate(['/grupos/novo'])
  }

  listar() {
    this.grupoService.listar().subscribe({
      next: (response) => {
        this.grupos = response._embedded['grupos'];
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  confirmarExclusao(grupo: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(grupo);
      }
    });
  }

  excluir(grupo: any) {
    this.grupoService.excluir(grupo.id).subscribe({
      complete: () => {
        this.grupos = this.grupos.filter(val => val.id !== grupo.id).slice();
        this.messageService.add({ severity: 'success', detail: 'Grupo excluído com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

}
