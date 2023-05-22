import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ViaCEPService {

  constructor(private http: HttpClient) { }

  cep(cep: string): Observable<any> {
    let url: string = "https://viacep.com.br/ws/" + cep + "/json/";
    return this.http.get<any>(url).pipe(
      retry(2)
    )
  }

}