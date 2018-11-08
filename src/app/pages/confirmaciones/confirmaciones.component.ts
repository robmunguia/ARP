import { Component, OnInit } from '@angular/core';
import { ConfirmacionService, AuthService, EnviosService, PermisosService } from '../../services/service.index';
import { Requisicion, Envio, Permisos } from '../../models/models.index';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-confirmaciones',
  templateUrl: './confirmaciones.component.html',
  styles: []
})
export class ConfirmacionesComponent implements OnInit {

  permiso: Permisos = new Permisos();
  requi: Requisicion = new Requisicion();
  TCH: number;
  TCM: number;
  TCI: number;
  TRH: number;
  TRM: number;
  TRI: number;

  constructor(public _confiService: ConfirmacionService,
              public _authService: AuthService,
              public permService: PermisosService,
              public _envioService: EnviosService,
              public activatedRoute: ActivatedRoute) {
                this.cargarPermiso( 'Confirmaciones' );

                this.activatedRoute.params.subscribe( params => {
                  this.cargarRequi( params['id'] );
                });
              }

  ngOnInit() {
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  calculoConfirmados() {
    this.TRH = 0;
    this.TRM = 0;
    this.TRI = 0;
    this.TCH = 0;
    this.TCM = 0;
    this.TCI = 0;
    for (const envi of this.requi.envios) {
      this.TCH += (envi.estatus === 'Sin Confirmar' ? 0 : envi.confhombre);
      this.TCM += (envi.estatus === 'Sin Confirmar' ? 0 : envi.confmujer);
      this.TCI += (envi.estatus === 'Sin Confirmar' ? 0 : envi.confindistinto);
    }

    // Calculo Restante
    this.TRH = this.requi.Hombres - this.TCH;
    this.TRM = this.requi.Mujeres - this.TCM;
    this.TRI = this.requi.Indistinto - this.TCI;
  }

  cargarRequi( id: number ) {
    this._confiService.ObtieneInfoRequi( id )
    .subscribe((data: Requisicion) => {
      this.requi = data;
      this.calculoConfirmados();
    });
  }

  confirmar( envi: Envio ) {

    if (this.validaciones(envi)) {

      swal({
        title: '¿Estas seguro de confirmar el envio?',
        text:  `H  ${ envi.confhombre } M ${ envi.confmujer } I ${ envi.confindistinto }`,
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!'
      }).then((result) => {
        if (result.value) {

          this._envioService.confirmacionEnvios( envi )
          .subscribe((data: Envio) => {
            envi.estatus = 'Confirmado';
            this.cargarRequi( this.requi.Id );
          });
        }
      });
    } else {
      swal(`H  ${ envi.hombre } M ${ envi.mujer } I ${ envi.indistinto }`,
        'No se puede confirmar con una cantidad mayor a lo enviado', 'info' );
    }
  }

  validaciones( envio: Envio ): boolean {
    if ( envio.hombre < envio.confhombre ) {
      return false;
    }
    if ( envio.mujer < envio.confmujer ) {
      return false;
    }
    if ( envio.indistinto < envio.confindistinto ) {
      return false;
    }
    return true;
  }

}
