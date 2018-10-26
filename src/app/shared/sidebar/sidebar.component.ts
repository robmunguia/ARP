import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(public _authService: AuthService ) {
      this.usuario = this._authService.usuario;
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
  }

  permiso( modulo: string ): boolean {
    const permi = this.usuario.permisos.find( p => p.modulo.nombre === modulo
                                            && p.grupo.Id === this.usuario.RolId
                                            && p.consultar);
    if (permi === undefined) {
      return false;
    }
    return true;
  }

}
