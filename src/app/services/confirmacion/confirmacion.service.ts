import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {

  constructor(public http: HttpClient) { }

  ObtieneInfoRequi( id: number = 0 ) {
    const url = URL_SERVICIOS + '/Requisicion/' + id;
    return this.http.get( url );
  }


}
