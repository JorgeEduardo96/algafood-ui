import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';

import { EstadoPesquisaComponent } from './estado-pesquisa/estado-pesquisa.component';
import { EstadoRoutingModule } from './estado-routing.module';
import { CoreModule } from '../core/core.module';
import { EstadoCadastroComponent } from './estado-cadastro/estado-cadastro.component';


@NgModule({
  declarations: [  
    EstadoPesquisaComponent,
    EstadoCadastroComponent
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
    EstadoRoutingModule
  ]
})
export class EstadoModule { }
