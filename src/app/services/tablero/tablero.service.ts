import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario, Grafica } from 'src/app/models/models.index';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  constructor(public http: HttpClient) { }

  cargarTablero() {
    const url = URL_SERVICIOS + '/Tablero';
    return this.http.get( url );
  }

  cargarCumplimientoCliente( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Tablero';
    return this.http.post( url, usuario )
    .map((data: Grafica[]) => {
      return data;
    });
  }


}
