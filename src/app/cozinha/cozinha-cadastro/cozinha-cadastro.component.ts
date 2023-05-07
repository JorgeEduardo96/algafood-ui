import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CozinhaService } from '../cozinha.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CozinhaForm } from './cozinha.form';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cozinha-cadastro',
  templateUrl: './cozinha-cadastro.component.html',
  styleUrls: ['./cozinha-cadastro.component.css'],
  providers: [CozinhaForm]
})
export class CozinhaCadastroComponent {

  cozinhaId: any;
  
  constructor(
    private messageService: MessageService,
    private cozinhaService: CozinhaService,
    private errorHandler: ErrorHandlerService,
    public cozinhaForm: CozinhaForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.cozinhaId = this.route.snapshot.paramMap.get('id');

    if (this.cozinhaId) {
      this.cozinhaService.buscar(Number(this.cozinhaId)).subscribe({
        next: (response) => {
          this.cozinhaForm.init(response);
          this.atualizarTituloEdicao();
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
  }
  
  get editando(): Boolean {
    return Boolean(this.cozinhaId);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.cozinhaForm.nome}`);
  }

  onSubmit() {
    if (this.editando) {
      this.atualizarCozinha();
    } else {
      this.adicionarCozinha();
    }
  }

  atualizarCozinha() {
    this.cozinhaService.atualizar(this.cozinhaForm.cozinhaValue, this.cozinhaId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Cozinha atualizada com sucesso!' });
        this.router.navigate(['cozinhas'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarCozinha() {
    this.cozinhaService.adicionar(this.cozinhaForm.cozinhaValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Cozinha adicionada com sucesso!' });
        this.router.navigate(['cozinhas'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/cozinhas']);
  }

}
