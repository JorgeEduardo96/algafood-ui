import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { CidadeCadastroComponent } from "./cidade-cadastro/cidade-cadastro.component";
import { CidadePesquisaComponent } from "./cidade-pesquisa/cidade-pesquisa.component";


const routes: Routes = [
  {
    path: '',
    component: CidadePesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CidadeCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_CIDADES'] }
  },
  {
    path: ':id',
    component: CidadeCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_CIDADES'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CidadeRoutingModule { }