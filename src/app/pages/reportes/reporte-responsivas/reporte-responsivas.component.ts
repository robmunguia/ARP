import { Component, OnInit } from '@angular/core';
import { ResponsivasService } from '../../../services/responsivas/responsivas.service';
import { TipoMaterial } from '../../../models/responsivas/tipomaterial.model';
import { Reportes, Fecha } from '../../../models/models.index';
import { RptResponsiva } from '../../../models/responsivas/reporte.model';
import { ExcelService } from '../../../services/excel/excel.service';

@Component({
  selector: 'app-reporte-responsivas',
  templateUrl: './reporte-responsivas.component.html',
  styles: []
})
export class ReporteResponsivasComponent implements OnInit {

  showResultado = false;
  showParametros = true;
  cargando = false;
  materiales: TipoMaterial[] = [];
  parametros: Reportes = new Reportes();
  resultados: RptResponsiva[] = null;

  constructor(public responsivaService: ResponsivasService,
              public excelService: ExcelService) {
    this.parametros.FecInicio = this.getMonday( new Date() );
  }

  ngOnInit() {
    this.cargarTMaterial();
  }

  cargarTMaterial() {
    this.responsivaService.cargaTiposMaterial()
    .subscribe((data: TipoMaterial[]) => {
      this.materiales = data;
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
    console.log(this.parametros);
    this.cargando = true;
    this.responsivaService.reporte( this.parametros )
    .subscribe((data: any) => {
      this.cargando = false;
      this.resultados = data;
    });
  }

  exportAsXLSX(): void {
    const tabla = document.getElementById('myTable');
    this.excelService.exportTabletoExcel(tabla, 'responsivas');
  }

}
