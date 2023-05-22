import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CidadeService } from '../cidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cidade-pesquisa',
  templateUrl: './cidade-pesquisa.component.html',
  styleUrls: ['./cidade-pesquisa.component.css']
})
export class CidadePesquisaComponent implements OnInit {

  cidades: any[] = [];

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private cidadeService: CidadeService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa - Cidades');
    this.listar();
  }

  novaCidade() {
    this.router.navigate([`cidades/novo`]);
  }

  listar() {
    this.cidadeService.listar().subscribe({
      next: (response) => {
        this.cidades = response._embedded['cidades'];
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  confirmarExclusao(cidade: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(cidade);
      }
    });
  }

  excluir(cidade: any) {
    this.cidadeService.excluir(cidade.id).subscribe({
      complete: () => {
        this.cidades = this.cidades.filter(val => val.id !== cidade.id).slice();
        this.messageService.add({ severity: 'success', detail: 'Cidade excluída com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })

  }

}
