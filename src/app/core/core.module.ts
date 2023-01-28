import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';

import { MessageService, MenuItem } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { MessageComponent } from './message/message.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,

    TranslateModule.forRoot(),
  ],
  exports: [
    MessageComponent,
    NavbarComponent
  ],
  providers: [
    MessageService,
    TranslateService,

    AuthService
  ]
})
export class CoreModule { }
