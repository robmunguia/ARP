import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/service.index';
import { Roles } from '../../models/roles.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  cargando = false;
  grupos: Roles[] = [];

  constructor(public grupoService: RolesService) { }

  ngOnInit() {
    this.cargarGrupos();
  }

  crearGrupo() {
    swal({
      title: 'Ingrese el nombre del Grupo',
      input: 'text',
      inputPlaceholder: 'Ingresar nombre del Grupo',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if ( value ) {
            this.guardarGrupo( value );
            resolve();
          } else {
            resolve('Ingrese el nombre del Grupo');
          }
        });
      }
    });
  }

  guardarGrupo( descripcion: string ) {
    const rol = new Roles(0, descripcion);
    this.grupoService.guardarRol( rol )
    .subscribe(() => {
      this.cargarGrupos();
     });
  }


  cargarGrupos () {
    this.cargando = true;
    this.grupoService.obtenerRoles()
    .subscribe((data: Roles[]) => {
      this.grupos = data;
      this.cargando = false;
    });
  }

  modificarGrupo( grupo: Roles ) {
    this.grupoService.modificarRol( grupo )
    .subscribe(() => { });
  }

}
