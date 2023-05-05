import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';

import { CoreModule } from '../core/core.module';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { CidadeRoutingModule } from './cidade-routing.module';

@NgModule({
  declarations: [
    CidadePesquisaComponent,
    CidadeCadastroComponent
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

    CoreModule,
    CidadeRoutingModule
  ]
})
export class CidadeModule { }
