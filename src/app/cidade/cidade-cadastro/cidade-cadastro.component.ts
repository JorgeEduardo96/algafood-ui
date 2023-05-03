import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cidade } from 'src/app/core/model';
import { CidadeService } from '../cidade.service';
import { EstadoService } from 'src/app/estado/estado.service';

@Component({
  selector: 'app-cidade-cadastro',
  templateUrl: './cidade-cadastro.component.html',
  styleUrls: ['./cidade-cadastro.component.css']
})
export class CidadeCadastroComponent implements OnInit {

  cidade = new Cidade();
  estados: any[] = [];
  estadoSelecionado?: number;

  constructor(
    private messageService: MessageService,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private errorHandler: ErrorHandlerService,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    const codigoCidade = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova cidade');
    this.carregarEstados();
    if (codigoCidade && codigoCidade !== 'nova') {
      this.carregarPessoa(codigoCidade);
    }
  }

  get editando(): Boolean {
    return Boolean(this.cidade.id);
  }

  carregarEstados() {
    this.estadoService.listar().subscribe({
      next: (response) => {
        this.estados = response._embedded.estados;
        console.log(response._embedded.estados);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  carregarPessoa(codigo: number) {
    this.cidadeService.buscar(codigo).subscribe({
      next: (response) => {
        this.cidade = response;
        this.atualizarTituloEdicao();
        this.estadoSelecionado = this.cidade.estado.id;
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.cidade.nome}`);
  }

  salvar() {
    this.cidade.estado.id = this.estadoSelecionado;
    if (this.editando) {
      this.atualizarCidade();
    } else {
      this.adicionarCidade();
    }
  }

  atualizarCidade() {
    this.cidadeService.atualizar(this.cidade).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Cidade atualizada com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarCidade() {
    this.cidadeService.adicionar(this.cidade).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Cidade adicionada com sucesso!' });
        this.router.navigate(['cidades']);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }


}
