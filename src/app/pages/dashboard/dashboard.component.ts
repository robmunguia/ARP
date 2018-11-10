import { Component, OnInit } from '@angular/core';
import { AuthService, TableroService, SucursalesService } from 'src/app/services/service.index';
import { Requisicion, Fecha, Grafica, Tablero, EnvConfirmados, Sucursales, Usuario } from 'src/app/models/models.index';
import { Envio } from '../../models/envios.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  requis: Requisicion[] = [];
  grafica: Grafica[] = [];
  envConfirmado: EnvConfirmados[] = [];
  contador: Tablero = new Tablero();
  verGrafica = false;
  usuario: Usuario = new Usuario();
  sucursales: Sucursales[] = [];
  cargando = false;

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  constructor(public authService: AuthService,
              public sucuService: SucursalesService,
              public tableroService: TableroService ) {
                this.usuario = this.authService.usuario;
                this.cargarSucursales();
              }

  ngOnInit() {
    this.cargarTablero();
    this.cargarGrafica();
  }

  limpiarGrafica() {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    this.grafica = [];
  }

  onChange( evento ) {
    this.usuario.sucursales = evento;
    this.cargarTablero();
    this.cargarGrafica();
  }

  cargarSucursales() {
    this.sucuService.obtenerSucursales()
    .subscribe((data: Sucursales[]) => {
      this.sucursales = data;
    });
  }

  cargarTablero() {
    this.tableroService.cargarTablero( this.usuario.sucursales )
    .subscribe((data: any) => {
      this.requis = data.vencidas;
      this.contador.activos = data.activos;
      this.contador.bajas = data.bajas;
      this.contador.confirmados = data.confirmados;
      this.envConfirmado = data.enviados;
    });
  }

  cargarGrafica() {
    this.limpiarGrafica();
    this.verGrafica = false;
    this.tableroService.cargarCumplimientoCliente( this.usuario.sucursales )
    .subscribe((data: any) => {
      this.grafica = data;
      for (const gr of this.grafica) {
        this.doughnutChartLabels.push( gr.serie );
        this.doughnutChartData.push( gr.valor );
      }
      this.verGrafica = true;
    });
  }

  totalConfirmados( envio: Envio[] ): number {
    let total = 0;

    for (const env of envio) {
      total += env.confhombre + env.confmujer + env.confindistinto;
    }

    return total;
  }

  diasVencidos( d: Fecha ): number {
    const fecRequi = new Date(d.year, d.month - 1, d.day);
    const fecActual = new Date();

    const diff = Math.abs(fecActual.getTime() - fecRequi.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }

}
