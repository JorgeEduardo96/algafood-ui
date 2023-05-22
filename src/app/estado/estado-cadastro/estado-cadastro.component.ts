import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { EstadoForm } from './estado.form';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EstadoService } from '../estado.service';

@Component({
  selector: 'app-estado-cadastro',
  templateUrl: './estado-cadastro.component.html',
  styleUrls: ['./estado-cadastro.component.css'],
  providers: [EstadoForm]
})
export class EstadoCadastroComponent {

  estadoId: any;

  constructor(
    private messageService: MessageService,
    private estadoService: EstadoService,
    private errorHandler: ErrorHandlerService,
    public estadoForm: EstadoForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.estadoId = this.route.snapshot.paramMap.get('id');

    if (this.estadoId) {
      this.estadoService.buscar(Number(this.estadoId)).subscribe({
        next: (response) => {
          this.estadoForm.init(response);
          this.atualizarTituloEdicao();
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
  }

  get editando(): Boolean {
    return Boolean(this.estadoId);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.estadoForm.nome}`);
  }

  onSubmit() {
    if (this.editando) {
      this.atualizarEstado();
    } else {
      this.adicionarEstado();
    }
  }

  atualizarEstado() {
    this.estadoService.atualizar(this.estadoForm.estadoValue, this.estadoId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Estado atualizado com sucesso!' });
        this.router.navigate(['estados'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarEstado() {
    this.estadoService.adicionar(this.estadoForm.estadoValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Estado adicionado com sucesso!' });
        this.router.navigate(['estados'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/estados']);
  }

}
