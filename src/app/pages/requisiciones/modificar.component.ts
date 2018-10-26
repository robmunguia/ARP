import { Component, OnInit } from '@angular/core';
import { RequisicionesService, TipoNominaService, AuthService } from '../../services/service.index';
import { Requisicion, TipoNomina, Permisos } from '../../models/models.index';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styles: []
})
export class ModificarComponent implements OnInit {

  permiso: Permisos = new Permisos();
  requi: Requisicion = new Requisicion();
  tnominas: TipoNomina[] = [];
  readOnlyIndi: boolean;
  readOnlyHM: boolean;

  constructor(public requiService: RequisicionesService,
              public _authService: AuthService,
              public _tnominaService: TipoNominaService) {
                this.permiso = this._authService.usuario.permisos.find( p => p.modulo.nombre === 'ModificarRequi'
                && p.grupo.Id === this._authService.usuario.RolId);
              }

  ngOnInit() {
    this.readOnlyIndi = false;
    this.readOnlyHM = false;
    this.cargarTipoNominas();
  }

  cargarTipoNominas() {
    this._tnominaService.obtenerTipoNominasActivas()
    .subscribe((data: TipoNomina[]) => {
      this.tnominas = data;
    });
  }

  buscarRequisicion( id: number) {
    this.requiService.obtenerRequi( id )
    .subscribe((data: Requisicion) => {
      this.requi = data;
      for (const tno of this.tnominas) {
        if (this.requi.tnomina.Id === tno.Id) {
          this.requi.tnomina = tno;
        }
      }
    });
  }

  guardar() {
    this.requiService.actualizacion( this.requi )
    .subscribe(() => { this.reiniciar(); });
  }

  reiniciar() {
    this.requi = new Requisicion();
  }

  valueChange () {
    if ( this.requi.Hombres === 0 && this.requi.Mujeres === 0 && this.requi.Indistinto === 0 ) {
      this.readOnlyIndi = false;
      this.readOnlyHM = false;
    } else if ( this.requi.Hombres > 0 || this.requi.Mujeres > 0   ) {
      this.readOnlyIndi = true;
      this.readOnlyHM = false;
    } else {
      this.readOnlyIndi = false;
      this.readOnlyHM = true;
    }
  }

}
