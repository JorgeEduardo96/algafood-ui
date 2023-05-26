import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/seguranca/auth.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { SenhaInput } from '../model';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  usuarioLogado: string = ''
  usuarioLogadoId?: number;
  exibirModal?: boolean;

  senhaAtual: string = '';
  senhaNova: string = '';
  confirmacaoSenha: string = '';

  constructor(
    private messageService: MessageService,

    private auth: AuthService,
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
    this.usuarioLogadoId = this.auth.jwtPayload?.usuario_id;
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  logout() {
    this.auth.logout();
  }

  exibirModalAlteracaoSenha() {    
    this.senhaAtual = '';
    this.senhaNova = '';
    this.confirmacaoSenha = '';
    this.exibirModal = true;
    this.exibindoMenu = false;
  }

  alterarSenha() {
    if (this.senhaNova !== this.confirmacaoSenha) {
      this.messageService.add({ severity: 'warning', detail: 'As senhas digitadas não são iguais!' });
    } else {
      let input: SenhaInput = {
        senhaAtual: this.senhaAtual,
        senhaNova: this.senhaNova
      }      
      this.usuarioService.atulizarSenha(input, Number(this.usuarioLogadoId)).subscribe({
        complete: () => {
          this.messageService.add({ severity: 'success', detail: 'Senha alterada com sucesso!' });
          this.exibirModal = false;
          this.exibindoMenu = false;
        }, error: (error) => this.errorHandler.handle(error)
      })
    }
  }

}

