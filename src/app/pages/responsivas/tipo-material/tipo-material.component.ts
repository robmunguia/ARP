import { Component, OnInit } from '@angular/core';
import { ResponsivasService, PermisosService } from '../../../services/service.index';
import { TipoMaterial } from '../../../models/responsivas/tipomaterial.model';
import { Permisos } from '../../../models/permisos.model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-tipo-material',
  templateUrl: './tipo-material.component.html',
  styles: []
})
export class TipoMaterialComponent implements OnInit {

  permiso: Permisos = new Permisos();
  tipoMaterial: TipoMaterial[] = [];
  cargando = false;

  constructor(public tmaterialService: ResponsivasService,
              public permService: PermisosService) {
                this.cargarPermiso( 'Responsivas' );
              }

  ngOnInit() {
    this.cargarTipoMaterial();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  cargarTipoMaterial() {
    this.tmaterialService.cargaTiposMaterial()
    .subscribe((data: TipoMaterial[]) => {
      this.tipoMaterial = data;
    });
  }

  crearTipoMaterial() {
    swal({
      title: 'Ingrese la descripción',
      input: 'text',
      inputPlaceholder: 'Ingresar descripción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if ( value ) {
            this.guardar( value );
            resolve();
          } else {
            resolve('Ingrese la descripción del tipo de material');
          }
        });
      }
    });
  }

  guardar( descripcion: string ) {
    this.cargando = true;
    const tmaterial = new TipoMaterial(0, descripcion, true);
    this.tmaterialService.modificarTipoMaterial( tmaterial )
    .subscribe(() => { this.cargando = false; });
  }

  modificarTipoMaterial( tmaterial: TipoMaterial ) {
    this.cargando = true;
    this.tmaterialService.modificarTipoMaterial( tmaterial )
    .subscribe(() => { this.cargando = false; });
  }

}
