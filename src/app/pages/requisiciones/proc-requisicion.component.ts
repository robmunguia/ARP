import { Component, OnInit } from '@angular/core';
import { Proceso, Permisos } from '../../models/models.index';
import { AuthService, RequisicionesService, PermisosService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-proc-requisicion',
  templateUrl: './proc-requisicion.component.html',
  styles: []
})
export class ProcRequisicionComponent implements OnInit {

  permiso: Permisos = new Permisos();
  tipo = 'cancelar';
  motivo: string;
  detalle: boolean;
  requis = [];
  listado: Proceso[] = [];

  constructor(public authService: AuthService,
              public permService: PermisosService,
              public requisService: RequisicionesService ) {
                this.cargarPermiso('Abrir/CancelarRequi');
              }

  ngOnInit() {
    this.motivo = '';
    this.detalle = false;
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  procesar() {
    if (this.motivo === '') {
      swal('Advertencia', 'Ingrese el motivo', 'warning');
      return;
    } else {
      for (const item of this.requis) {
        this.listado.push(new Proceso(Number(item.label), this.motivo, '', this.tipo === 'cancelar' ? 2 : 1 ));
      }
      this.detalle = true;
      this.requisService.cambiarEstado( this.listado )
      .subscribe((data: any) => {
        this.listado = data;
        this.detalle = true;
      });
    }

  }

  reinicio() {
    this.motivo = '';
    this.detalle = false;
    this.tipo = 'cancelar';
    this.requis = [];
    this.listado = [];
  }

}
