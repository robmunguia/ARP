import { Component, OnInit } from '@angular/core';
import { TipoNominaService, AuthService, PermisosService } from '../../services/service.index';
import { TipoNomina, Permisos } from '../../models/models.index';

@Component({
  selector: 'app-tipo-nomina',
  templateUrl: './tipo-nomina.component.html',
  styles: []
})
export class TipoNominaComponent implements OnInit {

  permiso: Permisos = new Permisos();
  tnominas: TipoNomina[] = [];
  cargando: boolean;

  constructor(public _tnominaService: TipoNominaService,
              public permService: PermisosService,
              public _authService: AuthService) {
                this.cargarPermiso( 'Nomina' );
              }

  ngOnInit() {
    this.cargarTNominas();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  cargarTNominas() {
    this.cargando = true;

    this._tnominaService.obtieneTiposNominas()
    .subscribe((data: TipoNomina[]) => {
      this.tnominas = data;
      this.cargando = false;
    });
  }

  guardar( nomina: TipoNomina ) {
    this._tnominaService.guardarTNomina( nomina )
    .subscribe(() => { });
  }

}
