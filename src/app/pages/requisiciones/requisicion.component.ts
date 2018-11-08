import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { Cliente, Fecha, Puesto, Requisicion, TipoNomina, Turno } from '../../models/models.index';
import { AuthService, ClientesService, TipoNominaService, RequisicionesService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requisicion',
  templateUrl: './requisicion.component.html',
  styles: []
})
export class RequisicionComponent implements OnInit {

  clientes: Cliente[] = [];
  tnominas: TipoNomina[] = [];
  requi: Requisicion = new Requisicion();
  fecha: Fecha = new Fecha();
  minDate: Fecha = new Fecha();
  readOnlyIndi = false;
  readOnlyHM = false;

  constructor(public _clienteService: ClientesService,
              public _tnominaService: TipoNominaService,
              public _requisService: RequisicionesService,
              public router: Router,
              public _authService: AuthService ) { }

  ngOnInit() {
    this.cargarTipoNominas();
    this.cargarClientes();
  }

  cargarTipoNominas() {
    this._tnominaService.obtenerTipoNominasActivas()
    .subscribe((data: TipoNomina[]) => { this.tnominas = data; });
  }

  cambio( select ) {
    this.requi.cliente = select;
    this.requi.puesto = new Puesto();
    this.requi.turno = new Turno();
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

  cargarClientes() {
    this._clienteService.obtenerClientes( this._authService.usuario.Token )
    .subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  guardar() {
    if (this.validaciones()) {
      this._requisService.guardarRequisicion( this.requi )
      .subscribe((data: any) => {
        this.router.navigate(['/requis']);
      });
    }
  }

  validaciones(): boolean {
    if ( this.requi.cliente.Id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el cliente', 'warning' );
      return false;
    }
    if (this.requi.turno.Id === 0) {
      swal('Advertencia', 'Debe seleccionar el turno', 'warning' );
      return false;
    }
    if (this.requi.puesto.Id === 0) {
      swal('Advertencia', 'Debe seleccionar el puesto', 'warning' );
      return false;
    }
    if ( this.requi.tnomina.Id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el Tipo de Nómina', 'warning' );
      return false;
    }
    if ( this.requi.Hombres === 0 && this.requi.Mujeres === 0 && this.requi.Indistinto === 0 ) {
      swal('Advertencia', 'No se puede crear la requisición en 0', 'warning' );
      return false;
    }
    if ( this.requi.salario === 0  ) {
      swal('Advertencia', 'El salario debe ser mayor a 0', 'warning' );
      return false;
    }
    return true;
  }

}
