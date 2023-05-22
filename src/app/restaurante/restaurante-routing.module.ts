import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../seguranca/auth.guard";
import { RestaurantePesquisaComponent } from "./restaurante-pesquisa/restaurante-pesquisa.component";
import { RestauranteCadastroComponent } from "./restaurante-cadastro/restaurante-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: RestaurantePesquisaComponent,                
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: RestauranteCadastroComponent,                
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_RESTAURANTES'] }
    },
    {
        path: ':id',
        component: RestauranteCadastroComponent,                
        canActivate: [AuthGuard],
        data: { roles: ['EDITAR_RESTAURANTES'] }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RestauranteRoutingModule { }