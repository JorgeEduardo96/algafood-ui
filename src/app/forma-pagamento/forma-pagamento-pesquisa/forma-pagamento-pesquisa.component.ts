import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FormaPagamentoService } from '../forma-pagamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-forma-pagamento-pesquisa',
  templateUrl: './forma-pagamento-pesquisa.component.html',
  styleUrls: ['./forma-pagamento-pesquisa.component.css']
})
export class FormaPagamentoPesquisaComponent implements OnInit {

  formasPagamento: any[] = [];

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private formaPagamentoService: FormaPagamentoService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa - Formas de Pagamento');
    this.listar();
  }

  novaFormaPagamento() {
    this.router.navigate(['/formas-pagamento/novo']);
  }

  listar() {
    this.formaPagamentoService.listar().subscribe({
      next: (response) => {
        this.formasPagamento = response._embedded['formasPagamento'];
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

  excluir(formaPagamento: any) {
    this.formaPagamentoService.excluir(formaPagamento.id).subscribe({
      complete: () => {
        this.formasPagamento = this.formasPagamento.filter(val => val.id !== formaPagamento.id).slice();
        this.messageService.add({ severity: 'success', detail: 'Forma de Pagamento excluída com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

}
