import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GrupoPermissaoService {

    url: string = '/grupos/:grupoId/permissoes';

    constructor(
        private remoteGateway: RemoteGateway
    ) { }

    listar(id: number): Observable<any> {
        return this.remoteGateway.get(this.prepararUrl(id));
    }

    associar(grupoId: number, permissaoId: number): Observable<any> {
        return this.remoteGateway.put(`${this.prepararUrl(grupoId)}/${permissaoId}`, null);
    }

    desassociar(grupoId: number, permissaoId: number): Observable<any> {
        return this.remoteGateway.delete(`${this.prepararUrl(grupoId)}/${permissaoId}`);
    }

    private prepararUrl(id: number) {
        return this.url.replace(":grupoId", id + "");
    }
}