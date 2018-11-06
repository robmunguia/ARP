import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Sucursales } from '../../models/sucursal.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(public http: HttpClient) { }

  obtenerSucursales() {
    const url = URL_SERVICIOS + '/Sucursales';
    return this.http.get( url );
  }

  guardarSucursal( sucursal: Sucursales ) {
    const url = URL_SERVICIOS + '/Sucursales';
    return this.http.post( url, sucursal )
    .map((data: Sucursales) => {
      swal('Sucursal Creada', sucursal.Nombre, 'success');
      return data;
    });
  }

  modificarSucursal( sucursal: Sucursales ) {
    const url = URL_SERVICIOS + '/Sucursales';
    return this.http.put( url, sucursal )
    .map((data: Sucursales) => {
      swal('Sucursal Modificada', sucursal.Nombre, 'success');
      return data;
    });
  }


}
