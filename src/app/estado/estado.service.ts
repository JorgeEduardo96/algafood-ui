import { Injectable } from "@angular/core";
import { RemoteGateway } from "../core/remote.gateway";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class EstadoService {

    url: string = 'estados';

    constructor(
        private remoteGateway: RemoteGateway
    ) {}

    listar(): Observable<any> {
        return this.remoteGateway.get(this.url);
    }

}