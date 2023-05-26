import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioPesquisaComponent } from "./usuario-pesquisa/usuario-pesquisa.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { UsuarioCadastroComponent } from "./usuario-cadastro/usuario-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: UsuarioPesquisaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_USUARIOS_GRUPOS_PERMISSOES'] }
    },
    {
        path: ':id',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_USUARIOS_GRUPOS_PERMISSOES'] }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ], exports: [RouterModule]
})
export class UsuarioRoutingModule { }