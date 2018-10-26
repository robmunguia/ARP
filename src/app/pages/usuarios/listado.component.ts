import { Component, OnInit } from '@angular/core';
import { UsuariosService, SucursalesService } from '../../services/service.index';
import { Usuario, Sucursales } from '../../models/models.index';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  usuarios: Usuario[] = [];
  sucursales: Sucursales[] = [];
  cargando = false;
  desde: number;
  totalRegistros: number;

  constructor(public userService: UsuariosService,
              public sucuService: SucursalesService) { }

  ngOnInit() {
    this.desde = 0;
    this.totalRegistros = 0;
    this.cargarSucursales();
    this.cargarUsuarios();
  }

  cargarSucursales() {
    this.sucuService.obtenerSucursales()
    .subscribe((data: Sucursales[]) => {
      this.sucursales = data;
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.userService.obtenerUsuarios( this.desde, true )
    .subscribe((data: any) => {
      this.usuarios = data;
      this.totalRegistros = data[0].Total;
      this.cargando = false;
    });
  }

  guardar ( usuario: Usuario ) {
    this.userService.guardarSucursales( usuario )
    .subscribe(() => { });
  }

  buscar (termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    } else if ( termino.length > 2 ) {
      this.cargando = true;
      this.userService.buscarUsuarios( termino, true )
              .subscribe( (data: Usuario[]) => {
                this.usuarios = data;
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
    this.cargarUsuarios();

  }

}
