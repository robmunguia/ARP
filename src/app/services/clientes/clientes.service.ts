import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/models.index';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient) { }

  obtenerClientes( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Clientes';
    return this.http.post( url, usuario )
    .map((data: any) => {
      return data;
    });
  }

}
