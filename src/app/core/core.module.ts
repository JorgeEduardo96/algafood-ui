import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';

import {MenubarModule} from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { MessageComponent } from './message/message.component';
import { RemoteGateway } from './remote.gateway';
import { ErrorHandlerService } from './error-handler.service';
import { ViaCEPService } from './viacep.service';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    MenubarModule,

    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,

    TranslateModule.forRoot()
  ],
  exports: [
    MessageComponent,
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [  
    TranslateService,

    ErrorHandlerService,
    RemoteGateway,
    AuthService,
    ViaCEPService
  ]
})
export class CoreModule { }
