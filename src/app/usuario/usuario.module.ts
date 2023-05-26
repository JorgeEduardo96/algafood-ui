import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { PickListModule } from 'primeng/picklist';

import { CoreModule } from "../core/core.module";
import { UsuarioPesquisaComponent } from "./usuario-pesquisa/usuario-pesquisa.component";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

@NgModule({
    declarations: [
        UsuarioPesquisaComponent,
        UsuarioCadastroComponent
    ], imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        InputTextModule,
        InputNumberModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        ToolbarModule,
        PickListModule,

        CoreModule,
        UsuarioRoutingModule
    ]
})
export class UsuarioModule {  }