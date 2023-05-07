import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CozinhaPesquisaComponent } from "./cozinha-pesquisa/cozinha-pesquisa.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { CozinhaCadastroComponent } from "./cozinha-cadastro/cozinha-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: CozinhaPesquisaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: CozinhaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_COZINHAS'] }
      },
      {
        path: ':id',
        component: CozinhaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_COZINHAS'] }
      }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CozinhaRoutingModule { }