import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';

import { CoreModule } from "../core/core.module";
import { FormaPagamentoPesquisaComponent } from "./forma-pagamento-pesquisa/forma-pagamento-pesquisa.component";
import { FormaPagamentoRoutingModule } from "./forma-pagamento-routing.module";
import { FormaPagamentoCadastroComponent } from './forma-pagamento-cadastro/forma-pagamento-cadastro.component';

@NgModule({
    declarations: [
        FormaPagamentoPesquisaComponent,
        FormaPagamentoCadastroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        InputTextModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        ToolbarModule,

        CoreModule,
        FormaPagamentoRoutingModule
    ]
})
export class FormaPagamentoModule {

}