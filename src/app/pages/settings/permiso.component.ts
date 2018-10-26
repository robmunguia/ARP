import { Component, OnInit } from '@angular/core';
import { Permisos, Modulos, Roles } from '../../models/models.index';
import { PermisosService, ModulosService, RolesService } from '../../services/service.index';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styles: []
})
export class PermisoComponent implements OnInit {

  permiso: Permisos = new Permisos();
  modulos: Modulos[] = [];
  grupos: Roles[] = [];

  constructor(public permiService: PermisosService,
              public grupoService: RolesService,
              public moduloService: ModulosService) { }

  ngOnInit() {
    this.cargarGrupos();
    this.cargarModulos();
  }

  cargarGrupos() {
    this.grupoService.obtenerRoles()
    .subscribe((data: any) => {
      this.grupos = data;
    });
  }

  cargarModulos() {
    this.moduloService.cargarModulos()
    .subscribe((data: any) => {
      this.modulos = data;
    });
  }

  guardar() {

    this.permiService.guardar( this.permiso )
    .subscribe((data: Permisos) => { });

  }

}
