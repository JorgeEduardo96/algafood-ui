import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RemoteGateway } from '../core/remote.gateway';

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
 
}
