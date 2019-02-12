import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from '../../../models/responsivas/material.model';
import { ResponsivasService } from '../../../services/responsivas/responsivas.service';
import { PermisosService } from '../../../services/permisos/permisos.service';
import { Permisos } from '../../../models/permisos.model';
import { TipoMaterial } from '../../../models/responsivas/tipomaterial.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styles: []
})
export class MaterialComponent implements OnInit {

  cargando = false;
  material: Material = new Material();
  tipoMaterial: TipoMaterial[] = [];
  permiso: Permisos = new Permisos();

  constructor(public responService: ResponsivasService,
              public router: Router,
              public permService: PermisosService) {
      this.cargarPermiso( 'Responsivas' );
    }

  ngOnInit() {
    this.cargarTMaterialesActivos();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  cargarTMaterialesActivos() {
    this.cargando = true;
    this.responService.cargaTiposMaterialActivos()
    .subscribe((data: TipoMaterial[]) => {
      this.tipoMaterial = data;
    });
  }

  guardar() {
    this.cargando = true;
    this.responService.guardarMaterial( this.material )
    .subscribe(() => {
      this.cargando = false;
      this.router.navigate(['/material']);
    });
  }

}
