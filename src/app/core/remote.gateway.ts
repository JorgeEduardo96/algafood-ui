import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'


type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text'

@Injectable()
export class RemoteGateway {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  private buildUrl(url: string) {
    let newUrl = url
    if (!!url && url.charAt(0) !== '/') {
      newUrl = `/${url}`
    }

    return `${environment.apiUrl}${environment.apiVersion}${newUrl}`
  }

  public download(url: string, headers?: HttpHeaders): Observable<any> {
    return this.get(url, null, 'blob', headers)
  }

  public downloadAsPost(url: string, payload: any): Observable<any> {
    return this.httpClient.post(this.buildUrl(url), payload, { responseType: 'blob' })
  }

  public uploadFile(url: string, form: FormData): Observable<any> {
    return this.httpClient.post(this.buildUrl(url), form, {
      reportProgress: true,
      observe: 'events',
    })
  }

  public upload(url: string, formData: FormData): Observable<any> {
    return this.post(url, formData)
  }

  public get(
    url: string,
    params?: any,
    responseType?: ResponseType,
    headers?: any,
  ): Observable<any> {
    return this.request('GET', url, null, params, responseType, headers)
  }

  public delete(url: string, payload?: any, queryParams?: any): Observable<any> {
    return this.request('DELETE', url, payload, queryParams)
  }

  public post(url: string, payload: any, headers?: any): Observable<any> {
    return this.request('POST', url, payload, {}, 'json', headers)
  }

  public put(url: string, payload: any): Observable<any> {
    return this.request('PUT', url, payload)
  }

  private request(
    method: string,
    url: string,
    payload: any = null,
    queryParams?: any,
    responseType?: ResponseType,
    headers?: HttpHeaders,
  ): Observable<any> {
    const params = Object.entries(queryParams || {})
      .filter(([, value]) => value != null && value !== '')
      .reduce(
        (httpParams, [key, value]) => httpParams.append(key, "" + value),
        new HttpParams(),
      )

    return this.httpClient
      .request(method, this.buildUrl(url), {
        body: payload,
        params,
        headers,
        responseType,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {    
          return throwError(err)
        }),
      )
  }
}
