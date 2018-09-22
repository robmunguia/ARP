import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { estados } from '../../config/config';
import { Estatus, Roles, Usuario } from '../../models/models.index';
import { RolesService } from '../../services/roles/roles.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: []
})
export class NuevoUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  roles: Roles[] = [];
  estados: Estatus[] = [];
  titulo: string;

  constructor(public activatedRoute: ActivatedRoute,
    public _usuarioService: UsuariosService,
    public _rolesService: RolesService ) {
      this.estados = estados;
      this.cargarRoles();
      this.activatedRoute.params.subscribe( params => {
        this.cargarUsuario( params['id'] );
      });
    }

  ngOnInit() {
  }

  cargarUsuario( id: number ) {
    this._usuarioService.obtenerUsuario( id )
    .subscribe((user: any) => {
      this.usuario = user;
      if ( this.usuario.Id === 0 ) {
        this.titulo = 'Nuevo Usuario';
      } else {
        this.titulo = 'Editar Usuario';
      }
    });
  }
  cargarRoles() {
    this._rolesService.obtenerRoles()
    .subscribe((data: any) => {
      this.roles = data;
    });
  }

  guardarUsuario() {
    if ( this.usuario.Id === 0 && (this.usuario.Password === '' || this.usuario.Password === null) ) {
      swal('Advertencia', 'Debe ingresar la contraseña', 'warning' );
      return;
    }

    if ( this.usuario.Id === 0 ) {
      this._usuarioService.guardarUsuario( this.usuario )
      .subscribe(() => { });
    } else {
      this._usuarioService.modificarUsuario( this.usuario )
      .subscribe(() => { } );
    }
  }

}
