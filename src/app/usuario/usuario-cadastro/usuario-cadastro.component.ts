import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UsuarioForm } from './usuario.form';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsuarioGrupoService } from '../usuario-grupo.service';
import { GrupoService } from 'src/app/grupo/grupo.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
  providers: [UsuarioForm]
})
export class UsuarioCadastroComponent {

  usuarioId: any;
  confirmacaoSenha: string = '';

  grupos: any[] = [];
  gruposUsuario: any[] = [];
  listaResultante: any[] = [];

  constructor(
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private usuarioGrupoService: UsuarioGrupoService,
    private grupoService: GrupoService,
    private errorHandler: ErrorHandlerService,
    public usuarioForm: UsuarioForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    this.listarGrupos();

    if (this.usuarioId) {
      this.usuarioService.buscar(Number(this.usuarioId)).subscribe({
        next: (response) => {
          this.usuarioForm.init(response);
          this.usuarioForm.group.removeControl("senha");          
          this.atualizarTituloEdicao();
          this.listarGruposUsuario(Number(this.usuarioId));
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
  }

  get editando(): Boolean {
    return Boolean(this.usuarioId);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do usuário: ${this.usuarioForm.nome}`);
  }

  onSubmit() {
    if (this.editando) {
      this.atualizarUsuario();
    } else {
      if (!(this.confirmacaoSenha === this.usuarioForm.senha)) {
        this.messageService.add({ severity: 'warning', detail: 'As senhas digitadas não são iguais!' });
      }
      this.adicionarUsuario();
    }
  }

  listarGrupos() {
    this.grupoService.listar().subscribe({
      next: (response) => {
        this.grupos = response._embedded['grupos'];        
      }
    })
  }
  
  listarGruposUsuario(usuarioId: number) {
    this.usuarioGrupoService.listar(usuarioId).subscribe({
      next: (response) => {
        if (response._embedded) {
          this.gruposUsuario = response._embedded['grupos'];
          this.listaResultante = this.calcularListaResultante(this.grupos, this.gruposUsuario);
        } else {
          this.listaResultante = this.grupos;
        }
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  calcularListaResultante(grupos: any, gruposUsuario: any) {
    return grupos.filter((grupo: any) => {
      return !gruposUsuario.some((grupoUsuario: any) => {
        return grupoUsuario.id === grupo.id;
      });
    });
  }

  aoAssociarGrupo(event: any) {
    console.log("associando:", event);
    this.usuarioGrupoService.associar(Number(this.usuarioId), event[0].id).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Grupo associada ao Grupo com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  aoDesassociarGrupo(event: any) {
    console.log("desassociando:", event);
    this.usuarioGrupoService.desassociar(Number(this.usuarioId), event[0].id).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Grupo desassociada ao Grupo com sucesso!' });
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  atualizarUsuario() {
    this.usuarioService.atualizar(this.usuarioForm.usuarioValue, this.usuarioId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Usuário atualizado com sucesso!' });
        this.router.navigate(['usuarios'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarUsuario() {
    this.usuarioService.adicionar(this.usuarioForm.usuarioValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        this.router.navigate(['usuarios'])
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/usuarios']);
  }

}
