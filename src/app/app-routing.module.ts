import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  
  { path: 'cidades', loadChildren: () => import('../app/cidade/cidade.module').then(m => m.CidadeModule)  },
  { path: 'cozinhas', loadChildren: () => import('../app/cozinha/cozinha.module').then(m => m.CozinhaModule)  },
  { path: 'grupos', loadChildren: () => import('../app/grupo/grupo.module').then(m => m.GrupoModule)  },


  { path: '', redirectTo: 'cidades', pathMatch: 'full' }, 
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }