import { Component, OnInit } from '@angular/core';
import { UsuariosService, RolesService } from '../../services/service.index';
import { Estatus, Usuario, Roles } from '../../models/models.index';
import { estados } from '../../config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Roles[] = [];
  desde: number;
  totalRegistros: number;
  cargando: boolean;
  estados: Estatus[] = [];

  constructor( public _usuarioService: UsuariosService,
              public _rolesService: RolesService ) {
    this.desde = 0;
    this.estados = estados;
  }

  ngOnInit() {
    this.cargarRoles();
    this.cargarUsuarios();
  }

  cargarRoles() {
    this._rolesService.obtenerRoles()
        .subscribe((data: any) => {
          this.roles = data;
        });
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.obtenerUsuarios( this.desde )
              .subscribe( (resp: any) => {
                if (resp.length !== 0) {
                  this.totalRegistros = resp[0].Total;
                  this.usuarios = resp;
                }
                this.cargando = false;
              });
  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    } else if ( termino.length > 3 ) {
      this.cargando = true;
      this._usuarioService.buscarUsuarios( termino )
              .subscribe( (usuarios: Usuario[]) => {
                this.usuarios = usuarios;
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

  modificarUsuario (usuario: Usuario) {

    this._usuarioService.modificarUsuario( usuario )
        .subscribe( usr => {
          usuario.Password = '';
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });
  }

}
