import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormaPagamentoPesquisaComponent } from "./forma-pagamento-pesquisa/forma-pagamento-pesquisa.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { FormaPagamentoCadastroComponent } from "./forma-pagamento-cadastro/forma-pagamento-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: FormaPagamentoPesquisaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: FormaPagamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_FORMAS_PAGAMENTO'] }
    },
    {
        path: ':id',
        component: FormaPagamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_FORMAS_PAGAMENTO'] }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FormaPagamentoRoutingModule {

}