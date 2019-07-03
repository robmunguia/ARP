import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { TipoMaterial } from '../../models/responsivas/tipomaterial.model';
import { Material } from '../../models/responsivas/material.model';
import swal from 'sweetalert2';
import { Entrega } from '../../models/responsivas/entrega.model';
import { DetalleEntrega } from '../../models/responsivas/detentrega.model';
import { Reportes } from '../../models/reportes.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsivasService {

  constructor(public http: HttpClient) { }

  /*  Tipo de Material */
  cargaTiposMaterial() {
    const url = URL_SERVICIOS + '/tipo/material';
    return this.http.get( url );
  }
  cargaTiposMaterialActivos() {
    const url = URL_SERVICIOS + '/tipo/material/activos';
    return this.http.get( url );
  }
  guardarTipoMaterial( tipoMaterial: TipoMaterial ) {
    const url = URL_SERVICIOS + '/tipo/material';
    return this.http.post( url, tipoMaterial )
    .map((data: any) => {
      swal('Tipo de Material Creado', tipoMaterial.descripcion, 'success');
      return data;
    });
  }
  modificarTipoMaterial( tipoMaterial: TipoMaterial ) {
    const url = URL_SERVICIOS + '/tipo/material';
    return this.http.put( url, tipoMaterial )
    .map((data: any) => {
      swal('Tipo de Material modificado', tipoMaterial.descripcion, 'success');
      return data;
    });
  }
  /* END Tipo de Material END */

  /*  Material */
  obtenerMateriales( desde: number ) {
    const url = URL_SERVICIOS + '/materiales?desde=' + desde;
    return this.http.get( url );

  }
  buscarMateriales( termino: string ) {
    const url = URL_SERVICIOS + '/materiales?termino=' + termino;
    return this.http.get( url );
  }
  cargaMateriales() {
    const url = URL_SERVICIOS + '/material';
    return this.http.get( url );
  }
  cargaMaterialActivos() {
    const url = URL_SERVICIOS + '/material/activos';
    return this.http.get( url );
  }
  guardarMaterial( material: Material ) {
    const url = URL_SERVICIOS + '/material';
    return this.http.post( url, material )
    .map((data: any) => {
      swal('Material Creado', material.nombre, 'success');
      return data;
    });
  }
  modificarMaterial( material: Material ) {
    const url = URL_SERVICIOS + '/material';
    return this.http.put( url, material )
    .map((data: any) => {
      swal('Material modificado', material.nombre, 'success');
      return data;
    });
  }
  /* END Material END */

  /*  Colaborador */
  cargarColaborador( id: number ) {
    const url = URL_SERVICIOS + '/colaborador?id=' + id;
    return this.http.get( url );
  }
  /* END Colaborador END */

  /*  tallas */
  cargarTallas( ) {
    const url = URL_SERVICIOS + '/tallas';
    return this.http.get( url );
  }
  /* END  tallas END */

  /*  Entrega de Material */
  obtenerEntrega( id: number ) {
    const url = URL_SERVICIOS + '/responsiva?id=' + id;
    return this.http.get( url );
  }
  cargarEntregasEmpleado( id: number ) {
    const url = URL_SERVICIOS + '/empleado/responsivas?id=' + id;
    return this.http.get( url );
  }
  retornar( entrega: DetalleEntrega[] ) {
    const url = URL_SERVICIOS + '/responsiva';
    return this.http.put( url, entrega )
    .map((data: any) => {
      return data;
    });
  }
  generarResponsiva( entrega: Entrega ) {
    const url = URL_SERVICIOS + '/responsiva';
    return this.http.post( url, entrega )
    .map((data: any) => {
      return data;
    });
  }
  generarPDF( entrega: Entrega ) {
    const url = URL_SERVICIOS + '/view';
    return this.http.post( url, entrega, { responseType: 'blob' } )
    .map((resp: any) => {
      return new Blob([resp], { type: 'application/pdf' });
    });
  }
  generarMultiplePDF( entregas: DetalleEntrega[] ) {
    const url = URL_SERVICIOS + '/view/multiple';
    return this.http.post( url, entregas, { responseType: 'blob' } )
    .map((resp: any) => {
      return new Blob([resp], { type: 'application/pdf' });
    });
  }
  verPDF( folio: number ) {
    const url = URL_SERVICIOS + '/view?id=' + folio;
    return this.http.get( url, { responseType: 'blob'});
  }
  /* END  Entrega de Material END */

  /* Reporte */
  reporte( parametro: Reportes ) {
    const url = URL_SERVICIOS + '/reporte/responsiva';
    return this.http.post( url, parametro )
    .map((data: any) => {
      return data;
    });
  }
  /* END Reporte END */


}
