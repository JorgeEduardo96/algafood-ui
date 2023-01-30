import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cidade } from 'src/app/core/model';
import { CidadeService } from '../cidade.service';

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
    private cidadeService: CidadeService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoCidade = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoCidade && codigoCidade !== 'nova') {
      this.carregarPessoa(codigoCidade);
    }
  }

  carregarPessoa(codigo: number) {
    this.cidadeService.buscar(codigo).subscribe((retorno: any) => {
      this.cidade = retorno;
      console.log(this.cidade);
      this.atualizarTituloEdicao();
    })
  }

  
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.cidade.nome}`);
  }

}
