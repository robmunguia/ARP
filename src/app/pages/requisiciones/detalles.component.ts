import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisicionesService } from '../../services/service.index';
import { Requisicion } from '../../models/requisicion.model';
import { Envio } from '../../models/envios.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: []
})
export class DetallesComponent implements OnInit {

  requi: Requisicion = new Requisicion();
  confirmaciones: Envio[] = [];
  Totales = {
    H: 0,
    M: 0,
    I: 0,
    CH: 0,
    CM: 0,
    CI: 0
  };

  constructor(public _requisService: RequisicionesService,
              public activatedRoute: ActivatedRoute) {
                this.activatedRoute.params.subscribe( params => {
                  this.loadRequi( params['id'] );
                });
              }

  ngOnInit() {
  }

  loadRequi( id: number ) {
    this._requisService.obtenerRequi( id )
    .subscribe((data: Requisicion) => {
      this.requi = data;
      this.generaTotales();
    });
  }

  generaTotales() {
    this.Totales.H = 0;
    this.Totales.M = 0;
    this.Totales.I = 0;
    this.Totales.CH = 0;
    this.Totales.CM = 0;
    this.Totales.CI = 0;

    for (const envi of this.requi.envios) {
      // Envios
      this.Totales.H += envi.hombre;
      this.Totales.M += envi.mujer;
      this.Totales.I += envi.indistinto;
      // Confirmaciones
      if ( envi.estatus !== 'Sin Confirmar' ) {
        this.confirmaciones.push( envi );
        this.Totales.CH += envi.confhombre;
        this.Totales.CM += envi.confmujer;
        this.Totales.CI += envi.confindistinto;
      }
    }
  }

}
