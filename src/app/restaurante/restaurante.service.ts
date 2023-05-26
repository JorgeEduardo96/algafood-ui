import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";
import { RestauranteInput } from "../core/model";

@Injectable({
    providedIn: 'root'
})
export class RestauranteService {

    url: string = 'restaurantes';

    constructor(
        private remoteGateway: RemoteGateway
    ) { }

    listar(): Observable<any> {
        return this.remoteGateway.get(this.url);
    }

    buscar(id: number): Observable<any> {
        return this.remoteGateway.get(`${this.url}/${id}`);
    }

    excluir(id: number): Observable<void> {
        return this.remoteGateway.delete(`${this.url}/${id}`)
    }

    adicionar(restaurante: RestauranteInput): Observable<void> {
        return this.remoteGateway.post(this.url, restaurante);
    }

    atualizar(restaurante: RestauranteInput, restauranteId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${restauranteId}`, restaurante);
    }

    ativar(restauranteId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${restauranteId}/ativo`, null);
    }

    inativar(restauranteId: number): Observable<void> {
        return this.remoteGateway.delete(`${this.url}/${restauranteId}/ativo`);
    }

    abrir(restauranteId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${restauranteId}/abertura`, null);
    }

    fechar(restauranteId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${restauranteId}/fechamento`, null);
    }
}