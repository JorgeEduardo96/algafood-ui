import { Component } from '@angular/core';
import { GrupoForm } from './grupo.forms';
import { MessageService } from 'primeng/api';
import { GrupoService } from '../grupo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GrupoPermissaoService } from '../grupo-permissao.service';
import { PermissaoService } from '../permissao.service';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css'],
  providers: [GrupoForm]
})
export class GrupoCadastroComponent {

  grupoId: any;

  permissoes: any[] = [];
  permissoesGrupo: any[] = [];
  listaResultante: any[] = [];

  constructor(
    private messageService: MessageService,
    private grupoService: GrupoService,
    private grupoPermissaoService: GrupoPermissaoService,
    private permissaoService: PermissaoService,
    private errorHandler: ErrorHandlerService,
    public grupoForm: GrupoForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.grupoId = this.route.snapshot.paramMap.get('id');
    this.listarPermissoes();

    if (this.grupoId) {
      this.grupoService.buscar(Number(this.grupoId)).subscribe({
        next: (response) => {
          this.grupoForm.init(response);
          this.atualizarTituloEdicao();
          this.listarPermissoesGrupo(Number(this.grupoId));
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

  listarPermissoes() {
    this.permissaoService.listar().subscribe({
      next: (response) => {
        this.permissoes = response._embedded['permissoes'];        
      }
    })
  }

  listarPermissoesGrupo(grupoId: number) {
    this.grupoPermissaoService.listar(grupoId).subscribe({
      next: (response) => {
        if (response._embedded) {
          this.permissoesGrupo = response._embedded['permissoes'];
          this.listaResultante = this.calcularListaResultante(this.permissoes, this.permissoesGrupo);
        } else {
          this.listaResultante = this.permissoes;
        }        
      }
    })
  }

  calcularListaResultante(permissoes: any, permissoesGrupo: any) {
    return permissoes.filter((permissao: any) => {
      return !permissoesGrupo.some((permissaoGrupo: any) => {
        return permissaoGrupo.id === permissao.id;
      });
    });
  }

  aoAssociarPermissao(event: any) {
    console.log("associando:", event);
    this.grupoPermissaoService.associar(Number(this.grupoId), event[0].id).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Permissão associada ao Grupo com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  aoDesassociarPermissao(event: any) {
    console.log("desassociando:", event);
    this.grupoPermissaoService.desassociar(Number(this.grupoId), event[0].id).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Permissão desassociada ao Grupo com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/grupos']);
  }
}
