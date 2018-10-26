import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public http: HttpClient) { }

  obtenerUsuarios( desde: number, activos: boolean = false ) {
    let url = URL_SERVICIOS + '/Usuarios?desde=' + desde;
    if (activos) {
      url = url + '&activos=true';
    }
    return this.http.get( url );

  }
  buscarUsuarios( termino: string, activos: boolean = false ) {
    let url = URL_SERVICIOS + '/Usuarios?termino=' + termino;
    if (activos) {
      url = url + '&activos=true';
    }
    return this.http.get( url );

  }
  obtenerUsuario( id: number ) {
    const url = URL_SERVICIOS + '/Usuarios/' + id;
    return this.http.get( url );
  }

  guardarUsuario (usuario: Usuario) {
    const url = URL_SERVICIOS + '/Usuarios';

    return this.http.post( url, usuario )
              .map( (resp: any) => {
                swal('Usuario Creado', usuario.Nombre, 'success');
                return resp;
              });
  }

  modificarUsuario (usuario: Usuario) {
    const url = URL_SERVICIOS + '/Usuarios/' + usuario.Id;

    return this.http.put( url, usuario )
                .map( (resp: any) => {
                  swal('Usuario Actualizado', usuario.Nombre, 'success');
                  return resp;
                });
  }

  guardarSucursales( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Usuarios';

    return this.http.put( url, usuario )
    .map((data: any) => {
      swal('Sucursales Asignadas', usuario.Nombre, 'success');
      return data;
    });
  }

}
