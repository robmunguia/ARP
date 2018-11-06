import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { TipoNomina } from '../../models/models.index';
import swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoNominaService {

  constructor(public http: HttpClient,
              public authService: AuthService) { }

  obtieneTiposNominas() {
    const url = URL_SERVICIOS + '/Nomina';
    return this.http.get( url );
  }

  obtenerTipoNominasActivas() {
    const url = URL_SERVICIOS + '/Nomina/activas';
    return this.http.get( url );
  }

  guardarTNomina( tnomina: TipoNomina ) {
    const url = URL_SERVICIOS + '/Nomina';
    return this.http.post( url, tnomina )
    .map((data: any) => {
      swal('Tipo de Nómina Creado', tnomina.Nombre, 'success' );
      return data;
    });
  }

  modificarTNomina( tnomina: TipoNomina ) {
    const url = URL_SERVICIOS + '/Nomina';
    return this.http.put( url, tnomina )
    .map((data: any) => {
      swal('Tipo de Nómina Modificada', tnomina.Nombre, 'success' );
      return data;
    });
  }

}
