import { Component, OnInit } from '@angular/core';
import { AuthService, PermisosService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Permisos } from 'src/app/models/models.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  permisos: Permisos[] = [];

  showProceso = true;
  showReportes = true;

  constructor(public _authService: AuthService,
              public permServicio: PermisosService) {
              this.cargarPermisos();
  }

  ngOnInit() {
  }

  cargarPermisos() {
    this.permServicio.cargarPermisoMenu()
    .subscribe((data: Permisos[]) => {
      this.permisos = data;
      this.permiso('Reportes');
      this.permiso('Procesos');
    });
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
  }

  permiso( modulo: string ): boolean {
    const permi = this.permisos.find( p => p.modulo.nombre === modulo
                                      && p.consultar);
    if (modulo === 'Proceso') {
      this.showProceso = permi === undefined ? false : permi.consultar;
    }
    if (modulo === 'Reportes') {
      this.showReportes = permi === undefined ? false : permi.consultar;
    }
    if (permi === undefined) {
      return false;
    }
    return true;
  }

}
