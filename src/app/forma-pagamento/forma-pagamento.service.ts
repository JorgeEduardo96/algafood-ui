import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";
import { FormaPagamentoInput } from "../core/model";

@Injectable({
    providedIn: 'root'
})
export class FormaPagamentoService {

    url: string = 'formas-pagamento';

    constructor(
        private remoteGateway: RemoteGateway
    ) { }

    listar(): Observable<any> {
        return this.remoteGateway.get(this.url);
    }

    buscar(id: number): Observable<any> {
        return this.remoteGateway.get(`${this.url}/${id}`);
    }

    adicionar(formaPagamento: FormaPagamentoInput): Observable<void> {
        return this.remoteGateway.post(this.url, formaPagamento);
    }

    atualizar(formaPagamento: FormaPagamentoInput, formaPagamentoId: number): Observable<void> {
        return this.remoteGateway.put(`${this.url}/${formaPagamentoId}`, formaPagamento);
    }

    excluir(id: number): Observable<void> {
        return this.remoteGateway.delete(`${this.url}/${id}`)
    }

}