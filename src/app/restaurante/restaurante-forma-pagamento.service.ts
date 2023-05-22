import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RestauranteFormaPagamentoService {

    url: string = '/restaurantes/:restauranteId/formas-pagamento';

    constructor(
        private remoteGateway: RemoteGateway
    ) { }

    listar(id: number): Observable<any> {
        return this.remoteGateway.get(this.prepararUrl(id));
    }

    desassociar(restauranteId: number, formaPagamentoId: number): Observable<any> {
        return this.remoteGateway.delete(this.prepararUrl(restauranteId) + `/${formaPagamentoId}`);
    }

    private prepararUrl(id: number) {
        return this.url.replace(":restauranteId", id + "");
    }
}