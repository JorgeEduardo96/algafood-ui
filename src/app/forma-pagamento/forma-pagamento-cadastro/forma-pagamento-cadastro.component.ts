import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormaPagamentoForm } from './forma-pagamento.form';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forma-pagamento-cadastro',
  templateUrl: './forma-pagamento-cadastro.component.html',
  styleUrls: ['./forma-pagamento-cadastro.component.css'],
  providers: [FormaPagamentoForm]
})
export class FormaPagamentoCadastroComponent {

  formaPagamentoId: any;

  constructor(
    private messageService: MessageService,
    private formaPagamentoService: FormaPagamentoService,
    private errorHandler: ErrorHandlerService,
    public formaPagamentoForm: FormaPagamentoForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.formaPagamentoId = this.route.snapshot.paramMap.get('id');

    if (this.formaPagamentoId) {
      this.formaPagamentoService.buscar(Number(this.formaPagamentoId)).subscribe({
        next: (response) => {
          this.formaPagamentoForm.init(response);
          this.atualizarTituloEdicao();
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
  }

  get editando(): Boolean {
    return Boolean(this.formaPagamentoId);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.formaPagamentoForm.descricao}`);
  }

  onSubmit() {
    if (this.editando) {
      this.atualizarFormaPagamento();
    } else {
      this.adicionarFormaPagamento();
    }    
  }

  atualizarFormaPagamento() {
    this.formaPagamentoService.atualizar(this.formaPagamentoForm.formaPagamentoValue, this.formaPagamentoId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Forma de Pagamento atualizada com sucesso!' });
        this.router.navigate(['formas-pagamento'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarFormaPagamento() {
    this.formaPagamentoService.adicionar(this.formaPagamentoForm.formaPagamentoValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Forma de Pagamento adicionada com sucesso!' });
        this.router.navigate(['formas-pagamento'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/formas-pagamento']);
  }

}
