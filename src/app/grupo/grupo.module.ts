import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';

import { CoreModule } from '../core/core.module';
import { GrupoPesquisaComponent } from "./grupo-pesquisa/grupo-pesquisa.component";
import { GrupoCadastroComponent } from "./grupo-cadastro/grupo-cadastro.component";
import { GrupoRoutingModule } from "./grupo-routing.module";

@NgModule({
    declarations: [
        GrupoPesquisaComponent,
        GrupoCadastroComponent
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
        DropdownModule,
        PickListModule,

        CoreModule,
        GrupoRoutingModule
    ]
})
export class GrupoModule {}