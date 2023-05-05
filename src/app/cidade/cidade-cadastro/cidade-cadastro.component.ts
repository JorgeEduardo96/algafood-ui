import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CidadeService } from '../cidade.service';
import { EstadoService } from 'src/app/estado/estado.service';
import { CidadeForm } from './cidade.form';

@Component({
  selector: 'app-cidade-cadastro',
  templateUrl: './cidade-cadastro.component.html',
  styleUrls: ['./cidade-cadastro.component.css'],
  providers: [CidadeForm]
})
export class CidadeCadastroComponent {

  cidadeId: any;
  estados: any[] = [];

  constructor(
    private messageService: MessageService,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private errorHandler: ErrorHandlerService,
    public cidadeForm: CidadeForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.carregarEstados();
    this.cidadeId = this.route.snapshot.paramMap.get('id');

    if (this.cidadeId) {
      this.cidadeService.buscar(Number(this.cidadeId)).subscribe({
        next: (response) => {
          console.log("retorno back cidade", response);
          this.cidadeForm.init(response);
          console.log("valor do formulário", this.cidadeForm);
          this.atualizarTituloEdicao();
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
   }

  get editando(): Boolean {
    return Boolean(this.cidadeId);
  }

  carregarEstados() {
    this.estadoService.listar().subscribe({
      next: (response) => {
        this.estados = response._embedded.estados;
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.cidadeForm.nome}`);
  }

  onSubmit() {
    if (this.editando) {
      this.atualizarCidade();
    } else {
      this.adicionarCidade();
    }
  }

  atualizarCidade() {
    this.cidadeService.atualizar(this.cidadeForm.cidadeValue, this.cidadeId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Cidade atualizada com sucesso!' });
        this.router.navigate(['cidades']);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarCidade() {
    this.cidadeService.adicionar(this.cidadeForm.cidadeValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Cidade adicionada com sucesso!' });
        this.router.navigate(['cidades']);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/cidades']);
  }

}
