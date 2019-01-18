import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario, Cliente } from '../../models/models.index';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient) { }

  obtenerClientes( token: string ) {
    const url = URL_SERVICIOS + '/Clientes';
    return this.http.get( url );
  }

  obtenerCliente( codigo: string ) {
    const url = URL_SERVICIOS + '/cliente?codigo=' + codigo;
    return this.http.get( url );
  }

  cargarClientes( desde: number ) {
    const url = URL_SERVICIOS + '/clientes/desde?pag=' + desde;
    return this.http.get( url );

  }

  guardarSucursal( clie: Cliente ) {
    const url = URL_SERVICIOS + '/Clientes';
    return this.http.put( url, clie )
    .map((data: any) => {
      swal('Asignado Correctamente', clie.Descripcion, 'success');
      return data;
    });
  }


  buscarClientes( termino: string ) {
    const url = URL_SERVICIOS + 'clientes/termino?term=' + termino;
    return this.http.get( url );
  }

}
