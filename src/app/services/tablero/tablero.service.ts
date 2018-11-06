import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class TableroService {

  constructor(public http: HttpClient) { }

  cargarTablero() {
    const url = URL_SERVICIOS + '/tablero';
    return this.http.get( url );
  }

  cargarCumplimientoCliente() {
    const url = URL_SERVICIOS + '/grafica';
    return this.http.get( url );
  }

}
