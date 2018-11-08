import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnviosService, AuthService, PermisosService } from '../../services/service.index';
import { Requisicion, Envio, Permisos } from '../../models/models.index';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styles: []
})
export class EnvioComponent implements OnInit {

  permiso: Permisos = new Permisos();
  requi: Requisicion = new Requisicion();
  envio: Envio = new Envio();
  TEnvio: Envio = new Envio();
  T_H: number = this.requi.Hombres;
  T_M: number = this.requi.Mujeres;
  T_I: number = this.requi.Indistinto;
  E_H: number = this.envio.hombre;
  E_M: number = this.envio.mujer;
  E_I: number = this.envio.indistinto;

  constructor(public _envioService: EnviosService,
              public permService: PermisosService,
              public _authService: AuthService,
              public activatedRoute: ActivatedRoute) {
                this.cargarPermiso( 'Envios' );

                this.activatedRoute.params.subscribe( params => {
                  this.cargarInfo( params['id'] );
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

  cargarInfo( id: number = 0) {
    this.T_H = 0;
    this.T_M = 0;
    this.T_I = 0;
    this.TEnvio = new Envio();
    this._envioService.ObtieneInfoRequi( id )
    .subscribe(( data: Requisicion) => {
      this.requi = data;
      for (const envi of this.requi.envios) {
        this.TEnvio.hombre += envi.hombre;
        this.TEnvio.mujer += envi.mujer;
        this.TEnvio.indistinto += envi.indistinto;
        this.T_H += envi.estatus === 'Confirmado' ? envi.confhombre : 0;
        this.T_M += envi.estatus === 'Confirmado' ? envi.confmujer : 0;
        this.T_I += envi.estatus === 'Confirmado' ? envi.confindistinto : 0;
      }
      this.T_H = this.requi.Hombres - this.T_H;
      this.T_M = this.requi.Mujeres - this.T_M;
      this.T_I = this.requi.Indistinto - this.T_I;
    });
  }

  guardar() {
    if ( this.validaciones() ) {
      this.envio.requisicion = this.requi;

      this._envioService.guardaEnvios( this.envio )
      .subscribe(() => {
        this.envio = new Envio();
        this.cargarInfo( this.requi.Id );
      });
    }
  }

  validaciones( ): boolean {
    if ( this.envio.hombre > this.T_H ) {
      return false;
    }
    if ( this.envio.mujer > this.T_M ) {
      return false;
    }
    if ( this.envio.indistinto > this.T_I ) {
      return false;
    }
    return true;
  }

}
