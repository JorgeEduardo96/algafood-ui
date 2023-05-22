import { Component } from '@angular/core';
import { GrupoForm } from './grupo.forms';
import { MessageService } from 'primeng/api';
import { GrupoService } from '../grupo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css'],
  providers: [GrupoForm]
})
export class GrupoCadastroComponent {

  grupoId: any;

  constructor(
    private messageService: MessageService,
    private grupoService: GrupoService,
    private errorHandler: ErrorHandlerService,
    public grupoForm: GrupoForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.grupoId = this.route.snapshot.paramMap.get('id');

    if (this.grupoId) {
      this.grupoService.buscar(Number(this.grupoId)).subscribe({
        next: (response) => {
          this.grupoForm.init(response);
          this.atualizarTituloEdicao();
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
  }

  get editando(): Boolean {
    return Boolean(this.grupoId);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cidade: ${this.grupoForm.nome}`);
  }

  onSubmit() {
    if (this.editando) {
      this.atualizarGrupo();
    } else {
      this.adicionarGrupo();
    }
  }

  atualizarGrupo() {
    this.grupoService.atualizar(this.grupoForm.grupoValue, this.grupoId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Grupo atualizado com sucesso!' });
        this.router.navigate(['grupos'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarGrupo() {
    this.grupoService.adicionar(this.grupoForm.grupoValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Grupo adicionado com sucesso!' });
        this.router.navigate(['grupos'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/grupos']);
  }
}
