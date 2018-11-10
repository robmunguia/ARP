import { Component, OnInit } from '@angular/core';
import { RequisicionesService, TipoNominaService, AuthService, PermisosService, SucursalesService } from '../../services/service.index';
import { Requisiciones, TipoNomina, Requisicion, Permisos } from '../../models/models.index';
import swal from 'sweetalert2';
import { Sucursales } from '../../models/sucursal.model';
import { Usuario } from 'src/app/models/models.index';

@Component({
  selector: 'app-requisiciones',
  templateUrl: './requisiciones.component.html',
  styles: []
})
export class RequisicionesComponent implements OnInit {

  // Permisos en listados
  reqPermiso: Permisos = new Permisos();
  enviPermiso: Permisos = new Permisos();
  confiPermiso: Permisos = new Permisos();

  ReqClientes: Requisiciones[] = [];
  nominas: TipoNomina[] = [];
  sucursales: Sucursales[] = [];
  usuario: Usuario = new Usuario();
  cargando = false;

  constructor(public _requisService: RequisicionesService,
              public permService: PermisosService,
              public sucuService: SucursalesService,
              public _authService: AuthService,
              public _tnominaService: TipoNominaService) {
                this.usuario = this._authService.usuario;
                this.cargarPermiso( 'Requisiciones' );
                this.cargarPermiso( 'Envios' );
                this.cargarPermiso( 'Confirmaciones' );
                this.cargarSucursales();
              }

  ngOnInit() {
    this.cargarTipoNominas();
    this.cargarRequis();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      if ( modulo === 'Requisiciones') {
        this.reqPermiso = data;
      } else if ( modulo === 'Envios') {
        this.enviPermiso = data;
      } else if ( modulo === 'Confirmaciones') {
        this.confiPermiso = data;
      }
    });
  }

  cargarSucursales() {
    this.sucuService.obtenerSucursales()
    .subscribe((data: Sucursales[]) => {
      this.sucursales = data;
    });
  }

  onChange( evento ) {
    this.usuario.sucursales = evento;
    this.cargarRequis();
  }

  cargarRequis() {
    this.cargando = true;
    this._requisService.cargarRequUsuarioAbiertas( this.usuario )
    .subscribe((data: any) => {
      this.ReqClientes = data;
      for (const clie of this.ReqClientes) {
        clie.Hombres = 0;
        clie.Mujeres = 0;
        clie.Indistinto = 0;
        let color = clie.requisiciones[0].tnomina.Color;
        for (const requis of clie.requisiciones) {
          if ( color !== requis.tnomina.Color ) {
            color = '';
          }
          clie.TextColor = requis.tnomina.Nombre === 'Reclutamiento' ? '#000' : '#fff';
          clie.Hombres += requis.Hombres;
          clie.Mujeres += requis.Mujeres;
          clie.Indistinto += requis.Indistinto;
        }
        clie.Color = color;
      }
      this.cargando = false;
    });
  }

  cargarTipoNominas() {
    this._tnominaService.obtenerTipoNominasActivas()
    .subscribe((data: TipoNomina[]) => {
      this.nominas = data;
    });
  }

  cerrarRequi ( requi: Requisicion ) {

    swal({
      title: '¿Cerrar la requisición?',
      text:  `de: ${ requi.cliente.Descripcion }`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar!'
    }).then((result) => {
      if (result.value) {

        requi.estatus = 3;
        this._requisService.modificarRequisicion( requi )
        .subscribe(() => {
          this.ReqClientes = [];
          this.cargarRequis();
        });

      }
    });

  }

}
