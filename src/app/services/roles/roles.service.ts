import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Roles } from '../../models/roles.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(public http: HttpClient) { }

  obtenerRoles() {
    const url = URL_SERVICIOS + '/Grupos';
    return this.http.get( url );
  }

  guardarRol( rol: Roles ) {
    const url = URL_SERVICIOS + '/Grupos';
    return this.http.post( url, rol )
    .map( (resp: any) => {
      swal('Grupo Creado', rol.Descripcion, 'success');
      return resp;
    });
  }

  modificarRol( rol: Roles ) {
    const url = URL_SERVICIOS + '/Grupos/' + rol.Id;

    return this.http.put( url, rol )
    .map( (resp: any) => {
      swal('Grupo Actualizado', rol.Descripcion, 'success');
      return resp;
    });
  }
}
