import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  
  { path: 'cidades', loadChildren: () => import('../app/cidade/cidade.module').then(m => m.CidadeModule)  },
  { path: 'cozinhas', loadChildren: () => import('../app/cozinha/cozinha.module').then(m => m.CozinhaModule)  },
  { path: 'grupos', loadChildren: () => import('../app/grupo/grupo.module').then(m => m.GrupoModule)  },
  { path: 'estados', loadChildren: () => import('../app/estado/estado.module').then(m => m.EstadoModule)  },
  { path: 'restaurantes', loadChildren: () => import('../app/restaurante/restaurante.module').then(m => m.RestauranteModule)  },
  { path: 'usuarios', loadChildren: () => import('../app/usuario/usuario.module').then(m => m.UsuarioModule)  },
  { path: 'formas-pagamento', loadChildren: () => import('../app/forma-pagamento/forma-pagamento.module').then(m => m.FormaPagamentoModule)  },

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