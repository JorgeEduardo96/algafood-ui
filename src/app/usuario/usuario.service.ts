import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";
import { SenhaInput, UsuarioInput } from "../core/model";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    url: string = 'usuarios';

    constructor(
        private remoteGateway: RemoteGateway
    ) { }

    listar(): Observable<any> {
        return this.remoteGateway.get(this.url);
    }

    buscar(id: number): Observable<any> {
        return this.remoteGateway.get(`${this.url}/${id}`);
    }

    adicionar(usuario: UsuarioInput): Observable<void> {
        return this.remoteGateway.post(this.url, usuario);
    }

    atualizar(usuario: UsuarioInput, usuarioId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${usuarioId}`, usuario);
    }

    atulizarSenha(senhaInput: SenhaInput, usuarioId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${usuarioId}/senha`, senhaInput);
    } 

}