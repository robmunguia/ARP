import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../store/actions/ui.actions';
import { SetUserAction } from 'src/app/store/actions/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;

  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
    public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.usuario ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
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
    const url = URL_SERVICIOS + '/Auth';

    this.store.dispatch( new ActivarLoadingAction() );

    return this.http.post( url, usuario )
      .map( (user: Usuario) => {
        this.guardarStorage( user );
        this.store.dispatch( new DesactivarLoadingAction() );
        this.store.dispatch( new SetUserAction( user ) );
        return user;
      });
  }

  cargarPerfil( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Auth/perfil';

    return this.http.get( url );
  }

  cambiarClave( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Auth/change';

    return this.http.post( url, usuario )
    .map((data: any) => {
      return data;
    });
  }

}
