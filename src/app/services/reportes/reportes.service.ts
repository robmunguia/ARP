import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reportes } from 'src/app/models/models.index';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(public http: HttpClient) { }

  obtGeneral ( param: Reportes ) {
    const url = URL_SERVICIOS + '/Reporte/general';
    return this.http.post( url, param )
    .map((data: any) => {
      return data;
    });
  }
}
