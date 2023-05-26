import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { RemoteGateway } from "../core/remote.gateway";

@Injectable({
    providedIn: 'root'
})
export class UsuarioGrupoService {

    url: string = "/usuarios/:usuarioId/grupos";

    constructor(
        private remoteGateway: RemoteGateway
    ) {  }

    listar(id: number): Observable<any> {
        return this.remoteGateway.get(this.prepararUrl(id));
    }

    associar(usuarioId: number, grupoId: number): Observable<any> {
        return this.remoteGateway.put(`${this.prepararUrl(usuarioId)}/${grupoId}`, null);
    }

    desassociar(usuarioId: number, grupoId: number): Observable<any> {
        return this.remoteGateway.delete(`${this.prepararUrl(usuarioId)}/${grupoId}`);
    }

    private prepararUrl(id: number) {
        return this.url.replace(":usuarioId", id + "");
    }
}