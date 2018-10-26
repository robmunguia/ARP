import { Component, OnInit } from '@angular/core';
import { TipoNominaService, AuthService } from '../../services/service.index';
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
              public _authService: AuthService) {
                this.permiso = this._authService.usuario.permisos.find( p => p.modulo.nombre === 'Nomina'
                && p.grupo.Id === this._authService.usuario.RolId);
              }

  ngOnInit() {
    this.cargarTNominas();
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
