import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Permisos } from '../../models/models.index';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(public http: HttpClient) { }

  obtenerPermisos( desde: number ) {
    const url = URL_SERVICIOS + '/permisos/pag?desde=' + desde;
    return this.http.get( url );
  }
  buscarPermisos( termino: string ) {
    const url = URL_SERVICIOS + '/permisos/term?termino=' + termino;
    return this.http.get( url );
  }

  guardar( permiso: Permisos ) {
    const url = URL_SERVICIOS + '/Permisos';

    return this.http.post( url, permiso )
    .map((data: Permisos) => {
      swal('Creado Correctamente', permiso.modulo.nombre, 'success');
      return data;
    });

  }

  actualizar( permiso: Permisos ) {
    const url = URL_SERVICIOS + '/Permisos';

    return this.http.put( url, permiso )
    .map((data: Permisos) => {
      swal('Modificaco Correctamente', permiso.modulo.nombre, 'success');
      return data;
    });
  }

}
