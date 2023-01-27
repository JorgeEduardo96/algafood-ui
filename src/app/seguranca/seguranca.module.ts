import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { CustomHttpInterceptor } from './custom-http-interceptor';
import { AuthorizedComponent } from './authorized/authorized.component';
import { AuthGuard } from './auth.guard';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { environment } from 'src/environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}
@NgModule({
  declarations: [
    AuthorizedComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),

    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },

    AuthGuard
  ]
})
export class SegurancaModule { }
