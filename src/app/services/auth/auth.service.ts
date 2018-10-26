import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.usuario ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.usuario = null;
    }
  }

  guardarStorage( usuario: Usuario ) {
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    this.usuario = usuario;
  }

  cerrarSesion() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  iniciarSesion( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/auth';

    return this.http.post( url, usuario )
    .map( (user: any) => {
      this.guardarStorage( user );
      return user;
    });

  }

  cargarPerfil( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Auth/' + usuario.Id;

    return this.http.put( url, usuario )
    .map((data: any) => {
      return data;
    });
  }

  cambiarClave( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Auth/' + usuario.Id;

    return this.http.post( url, usuario )
    .map((data: any) => {
      return data;
    });
  }

}
