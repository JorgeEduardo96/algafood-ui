import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    HttpClientModule,

    CoreModule,
    CidadeRoutingModule
  ]
})
export class CidadeModule { }
