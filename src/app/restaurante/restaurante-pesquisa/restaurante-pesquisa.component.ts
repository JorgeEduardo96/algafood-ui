import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RestauranteService } from '../restaurante.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestauranteFormaPagamentoService } from '../restaurante-forma-pagamento.service';

@Component({
  selector: 'app-resturante-pesquisa',
  templateUrl: './restaurante-pesquisa.component.html',
  styleUrls: ['./restaurante-pesquisa.component.css']
})
export class RestaurantePesquisaComponent implements OnInit {

  restaurantes: any[] = [];
  restaurantesFormaPagamento: any[] = [];
  exibirModal?: boolean;
  restauranteSelecionado?: number;

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private restauranteService: RestauranteService,
    private restauranteFormasPagamentoService: RestauranteFormaPagamentoService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }


  ngOnInit() {
    this.title.setTitle('Pesquisa - Restaurantes');
    this.listar();
  }

  novoRestaurante() {
    this.router.navigate(['restaurantes/novo']);
  }

  listar() {
    this.restauranteService.listar().subscribe({
      next: (response) => {
        this.restaurantes = response._embedded['restaurantes'];
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  confirmarExclusao(cozinha: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(cozinha);
      }
    });
  }

  excluir(restaurante: any) {
    this.restauranteService.excluir(restaurante.id).subscribe({
      complete: () => {
        this.restaurantes = this.restaurantes.filter(val => val.id !== restaurante.id).slice();
        this.messageService.add({ severity: 'success', detail: 'Restaurante excluído com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }


  // métodos para forma de pagamento
  exibirDialogFormasPagamento(id: any) {
    this.restauranteFormasPagamentoService.listar(id).subscribe({
      next: (response) => {
        if (response._embedded) {
          console.log(response);
          this.restaurantesFormaPagamento = response._embedded['formasPagamento'];
          this.restauranteSelecionado = id;
          this.exibirModal = true;
        } else {
          this.messageService.add({ severity: 'error', detail: 'Não há formas de pagamento associado a este restaurante!' });
        }
      }
    })
  }

  desassociarFormaPagamento(formaPagamentoId: any) {
    this.restauranteFormasPagamentoService.desassociar(Number(this.restauranteSelecionado), formaPagamentoId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Forma de Pagamento desassociada com sucesso!' });
        this.exibirModal = false;
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  // métodos para ativar/inativar restaurante
  ativarRestaurante(restauranteId: any) {
    this.restauranteService.ativar(restauranteId).subscribe({
      complete: () => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Restaurante ativado com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  inativarRestaurante(restauranteId: any) {
    this.restauranteService.inativar(restauranteId).subscribe({
      complete: () => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Restaurante inativado com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  // métodos para abrir/fechar restaurante
  abrirRestaurante(restauranteId: any) {
    this.restauranteService.abrir(restauranteId).subscribe({
      complete: () => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Restaurante aberto com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  fecharRestaurante(restauranteId: any) {
    this.restauranteService.fechar(restauranteId).subscribe({
      complete: () => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Restaurante fechado com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }
}
