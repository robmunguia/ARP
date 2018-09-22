import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnviosService, AuthService } from '../../services/service.index';
import { Requisicion, Envio, Fecha } from '../../models/models.index';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styles: []
})
export class EnvioComponent implements OnInit {

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
              public _authService: AuthService,
              public activatedRoute: ActivatedRoute) {

                this.activatedRoute.params.subscribe( params => {
                  this.cargarInfo( params['id'] );
                });
  }

  ngOnInit() {
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
      }
      this.T_H = this.requi.Hombres - this.TEnvio.hombre;
      this.T_M = this.requi.Mujeres - this.TEnvio.mujer;
      this.T_I = this.requi.Indistinto - this.TEnvio.indistinto;
    });
  }

  guardar() {
    if ( this.validaciones() ) {
      this.envio.requisicion = this.requi;
      this.envio.usuario = this._authService.usuario;

      this._envioService.guardaEnvios( this.envio )
      .subscribe((data: any) => {
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
