import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EstadoPesquisaComponent } from "./estado-pesquisa/estado-pesquisa.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { EstadoCadastroComponent } from "./estado-cadastro/estado-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: EstadoPesquisaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: EstadoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_ESTADOS'] }
    },
    {
        path: ':id',
        component: EstadoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_ESTADOS'] }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class EstadoRoutingModule {}