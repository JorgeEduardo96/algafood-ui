import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";
import { CozinhaInput } from "../core/model";

@Injectable({
    providedIn: 'root'
})
export class CozinhaService {

    url: string = 'cozinhas';

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

    adicionar(cozinha: CozinhaInput): Observable<void> {
        return this.remoteGateway.post(this.url, cozinha);
    }

    atualizar(cozinha: CozinhaInput, cozinhaId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${cozinhaId}`, cozinha);
    }
}