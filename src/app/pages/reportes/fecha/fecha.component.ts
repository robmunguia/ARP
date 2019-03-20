import { Component, OnInit } from '@angular/core';
import { Reportes } from '../../../models/reportes.model';
import { ReportesService, SucursalesService } from '../../../services/service.index';
import { Fecha } from '../../../models/date.model';
import { Sucursales } from 'src/app/models/models.index';
import { ExcelService } from '../../../services/excel/excel.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styles: []
})
export class FechaComponent implements OnInit {

  parametros: Reportes = new Reportes();
  resultados: any;
  sucursales: Sucursales[] = [];
  showResultado = false;
  showParametros = true;
  cargando = false;

  // LazyData
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];

  constructor(public repoService: ReportesService,
              public excelService: ExcelService,
              public sucuService: SucursalesService) {
    this.parametros.FecInicio = this.getMonday( new Date() );
  }

  ngOnInit() {
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.sucuService.obtenerSucursales()
    .subscribe((data: Sucursales[]) => {
      this.sucursales = data;
    });
  }

  getMonday( date: Date ): Fecha {
    const day = date.getDay() || 7;
    if ( day !== 1 ) {
      date.setHours(-24 * (day - 1));
    }
    return new Fecha( date.getFullYear(), date.getMonth() + 1, date.getDate() );
  }

  cargarReporte() {
    this.cargando = true;
    this.repoService.obtDias( this.parametros )
    .subscribe((data: any) => {
      this.cargando = false;
      this.resultados = data;
    });
  }

  exportAsXLSX(): void {
    const tabla = document.getElementById('myTable');
    this.excelService.exportTabletoExcel(tabla, 'reporte_dias');
  }

}
