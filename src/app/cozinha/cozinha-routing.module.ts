import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CozinhaPesquisaComponent } from "./cozinha-pesquisa/cozinha-pesquisa.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: CozinhaPesquisaComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CozinhaRoutingModule { }