import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "../seguranca/auth.guard";
import { GrupoPesquisaComponent } from "./grupo-pesquisa/grupo-pesquisa.component";
import { GrupoCadastroComponent } from "./grupo-cadastro/grupo-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: GrupoPesquisaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: GrupoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_USUARIOS_GRUPOS_PERMISSOES'] }
    },
    {
        path: ':id',
        component: GrupoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_USUARIOS_GRUPOS_PERMISSOES'] }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class GrupoRoutingModule { }