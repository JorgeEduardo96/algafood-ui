import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule, registerLocaleData } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

import localePt from '@angular/common/locales/pt';

import { CoreModule } from "../core/core.module";
import { RestaurantePesquisaComponent } from "./restaurante-pesquisa/restaurante-pesquisa.component";
import { RestauranteRoutingModule } from "./restaurante-routing.module";
import { RestauranteCadastroComponent } from './restaurante-cadastro/restaurante-cadastro.component';

registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [
        RestaurantePesquisaComponent,
        RestauranteCadastroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        InputTextModule,
        InputNumberModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        ToolbarModule,
        DropdownModule,
        PanelModule,
        InputTextareaModule,
        DialogModule,

        CoreModule,
        RestauranteRoutingModule
    ],  providers: [
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        },
        {
            provide:  DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        },
    ]
})
export class RestauranteModule { }