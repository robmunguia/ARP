import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Modulos } from 'src/app/models/models.index';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(public http: HttpClient) { }

  cargarModulos() {
    const url = URL_SERVICIOS + '/Modulos';
    return this.http.get( url );
  }

  guardarModulo( modulo: Modulos ) {
    const url = URL_SERVICIOS + '/Modulos';
    return this.http.post( url, modulo )
    .map((data: any) => {
      swal('Módulo Creado', modulo.nombre, 'success');
      return data;
    });
  }

  modificarModulo( modulo: Modulos ) {
    const url = URL_SERVICIOS + '/Modulos';
    return this.http.put( url, modulo )
    .map((data: any) => {
      swal('Módulo Modificado', modulo.nombre, 'success');
      return data;
    });
  }
}
