import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";

import { GrupoInput } from "../core/model";

@Injectable({
    providedIn: 'root'
})
export class GrupoService {

    url: string = 'grupos';

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

    adicionar(grupo: GrupoInput): Observable<void> {
        return this.remoteGateway.post(this.url, grupo);
    }

    atualizar(grupo: GrupoInput, grupoId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${grupoId}`, grupo);
    }
}