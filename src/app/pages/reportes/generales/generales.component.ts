import { Component, OnInit } from '@angular/core';
import { reqEstatus } from '../../../config/config';
import { Reportes } from '../../../models/reportes.model';
import { Estatus } from '../../../models/estados.model';
import { Fecha } from '../../../models/date.model';
import { AuthService } from '../../../services/auth/auth.service';
import { ReportesService } from '../../../services/reportes/reportes.service';
import { Sucursales } from '../../../models/sucursal.model';
import { SucursalesService } from '../../../services/sucursales/sucursales.service';


@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styles: []
})
export class GeneralesComponent implements OnInit {

  parametros: Reportes = new Reportes();
  estatus: Estatus[] = [];
  sucursales: Sucursales[] = [];
  showResultado = false;
  showParametros = true;
  cargando = false;

  constructor(public authService: AuthService,
              public sucuService: SucursalesService,
              public repoService: ReportesService) {
    this.estatus = reqEstatus;
    this.parametros.FecInicio = this.getMonday( new Date() );
    this.parametros.Estado = this.estatus[0].Id;
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

  generar() {
    this.cargando = true;
    this.repoService.obtGeneral( this.parametros )
    .subscribe((data: Reportes) => {
      this.parametros = data;
      this.cargando = false;
      this.showParametros = false;
      this.showResultado = true;
    });
  }

  getMonday( date: Date ): Fecha {
    const day = date.getDay() || 7;
    if ( day !== 1 ) {
      date.setHours(-24 * (day - 1));
    }
    return new Fecha( date.getFullYear(), date.getMonth() + 1, date.getDate() );
  }

}
