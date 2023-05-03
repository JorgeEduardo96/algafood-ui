import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RemoteGateway } from '../core/remote.gateway';
import { Cidade } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  
  url: string = 'cidades';

  constructor(
    private remoteGateway: RemoteGateway
  ) {}

   listar(): Observable<any> {
    return this.remoteGateway.get(this.url);
   }

   buscar(id: number): Observable<any> {
    return this.remoteGateway.get(`${this.url}/${id}`);
   }

   excluir(id: number): Observable<void> {
    return this.remoteGateway.delete(`${this.url}/${id}`)
   }

   adicionar(cidade: Cidade): Observable<void> {
    return this.remoteGateway.post(this.url, cidade);
   }

   atualizar(cidade: Cidade): Observable<void> {
    return this.remoteGateway.put(`${this.url}/${cidade.id}`, cidade);
   }
  
}
