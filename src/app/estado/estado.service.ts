import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";
import { EstadoInput } from "../core/model";

@Injectable({
    providedIn: 'root'
  })
export class EstadoService {

    url: string = 'estados';

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

    adicionar(estado: EstadoInput): Observable<void> {
        return this.remoteGateway.post(this.url, estado);
    }

    atualizar(estado: EstadoInput, estadoId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${estadoId}`, estado);
    }
}