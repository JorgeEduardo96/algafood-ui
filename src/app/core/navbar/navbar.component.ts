import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  usuarioLogado: string = ''

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  logout() {
    this.auth.logout();
  }

}

