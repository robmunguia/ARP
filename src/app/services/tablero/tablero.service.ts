import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Sucursales } from 'src/app/models/models.index';


@Injectable({
  providedIn: 'root'
})
export class TableroService {

  constructor(public http: HttpClient) { }

  cargarTablero( sucursales: Sucursales[] ) {
    const url = URL_SERVICIOS + '/tablero';
    return this.http.post( url, sucursales )
    .map((data: any) => {
      return data;
    });
  }

  cargarCumplimientoCliente( sucursales: Sucursales[] ) {
    const url = URL_SERVICIOS + '/grafica';
    return this.http.post( url, sucursales )
    .map((data: any) => {
      return data;
    });
  }

}
