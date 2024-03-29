import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CozinhaService } from '../cozinha.service';

@Component({
  selector: 'app-cozinha-pesquisa',
  templateUrl: './cozinha-pesquisa.component.html',
  styleUrls: ['./cozinha-pesquisa.component.css']
})
export class CozinhaPesquisaComponent implements OnInit {

  cozinhas: any[] = [];

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private cozinhaService: CozinhaService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa - Cozinhas');
    this.listar();
  }

  novaCozinha() {
    this.router.navigate([`cozinhas/novo`]);
  }

  listar() {
    this.cozinhaService.listar().subscribe({
      next: (response) => {
        this.cozinhas = response._embedded['cozinhas'];
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

  excluir(cozinha: any) {
    this.cozinhaService.excluir(cozinha.id).subscribe({
      complete: () => {
        this.cozinhas = this.cozinhas.filter(val => val.id !== cozinha.id).slice();
        this.messageService.add({ severity: 'success', detail: 'Cozinha excluída com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

}
