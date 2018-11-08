import { Component, OnInit } from '@angular/core';
import { Cliente, Sucursales, Permisos } from '../../models/models.index';
import { ClientesService, SucursalesService, AuthService, PermisosService } from '../../services/service.index';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  cargando = false;
  desde: number;
  totalRegistros: number;
  clientes: Cliente[] = [];
  sucursales: Sucursales[] = [];
  permiso: Permisos = new Permisos();

  constructor(public clieService: ClientesService,
              public authService: AuthService,
              public permService: PermisosService,
              public sucuService: SucursalesService) {
                this.cargarPermiso( 'ClientesSucursal' );
              }

  ngOnInit() {
    this.cargarSucursales();
    this.desde = 0;
    this.totalRegistros = 0;
    this.cargarClientes();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  cargarSucursales() {
    this.sucuService.obtenerSucursales()
    .subscribe((data: Sucursales[]) => {
      this.sucursales = data;
    });
  }

  cargarClientes() {
    this.cargando = true;
    this.clieService.cargarClientes( this.desde )
    .subscribe((data: Cliente[]) => {
      this.clientes = data;
      this.totalRegistros = data[0].Total;
      this.cargando = false;
    });
  }

  guardar ( clie: Cliente ) {
    this.clieService.guardarSucursal( clie )
    .subscribe(() => { });
  }

  buscar( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarClientes();
      return;
    } else if ( termino.length > 2 ) {
      this.cargando = true;
      this.clieService.buscarClientes( termino )
              .subscribe( (data: Cliente[]) => {
                this.clientes = data;
                this.cargando = false;
              });
    }
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    const totalPages = Math.ceil(this.totalRegistros / 15);

    if ( desde >= totalPages ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarClientes();

  }

}
