import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Requisicion, Usuario } from '../../models/models.index';
import swal from 'sweetalert2';
import { Proceso } from '../../models/proceso.model';

@Injectable({
  providedIn: 'root'
})
export class RequisicionesService {

  constructor(public http: HttpClient) { }

  obtenerRequi( id: number) {
    const url = URL_SERVICIOS + '/Requisicion/' + id;
    return this.http.get( url );
  }

  obtenerRequisAbiertas() {
    const url = URL_SERVICIOS + '/Requisicion';
    return this.http.get( url );
  }

  cargarRequUsuarioAbiertas( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Requisicion';

    return this.http.put( url, usuario )
    .map((data: any) => {
      return data;
    });
  }

  guardarRequisicion( requisicon: Requisicion ) {
    const url = URL_SERVICIOS + '/Requisicion';
    return this.http.post( url, requisicon )
    .map((data: Requisicion) => {
      swal('Requisición Creada', requisicon.cliente.Nombre, 'success' );
      return data;
    });
  }

  actualizacion(requi: Requisicion) {
    const url = URL_SERVICIOS + '/Requisicion/' + requi.Id;
    return this.http.post( url, requi )
    .map((data: any) => {
      swal('Requisición Modificada', requi.Id.toString(), 'success');
      return data;
    });
  }

  modificarRequisicion( requi: Requisicion ) {
    const url = URL_SERVICIOS + '/Requisicion/' + requi.Id;
    const estatus = requi.estatus === 3 ? 'Cerrada' : 'Abierta';
    return this.http.put( url, requi )
    .map(( data: any ) => {
      swal('Requisición ' + estatus, requi.cliente.Nombre, 'success' );
      return data;
    });
  }

  cambiarEstado( items: Proceso[] ) {
    const url = URL_SERVICIOS + '/Proceso/';
    return this.http.post( url, items )
    .map(( data: any ) => {
      // swal('Requisición ' + estatus, requi.cliente.Nombre, 'success' );
      return data;
    });
  }

}
