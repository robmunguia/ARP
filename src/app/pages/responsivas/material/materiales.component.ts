import { Component, OnInit } from '@angular/core';
import { Material } from '../../../models/responsivas/material.model';
import { ResponsivasService } from '../../../services/responsivas/responsivas.service';
import { PermisosService } from '../../../services/permisos/permisos.service';
import { Permisos } from '../../../models/permisos.model';
import { TipoMaterial } from '../../../models/responsivas/tipomaterial.model';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styles: []
})
export class MaterialesComponent implements OnInit {

  cargando = false;
  materiales: Material[] = [];
  tipoMateriales: TipoMaterial[] = [];
  permiso: Permisos = new Permisos();
  totalRegistros = 0;
  desde = 0;

  constructor(public responService: ResponsivasService,
              public permService: PermisosService) {
                this.cargarPermiso( 'Sucursales' );
              }

  ngOnInit() {
    this.cargarTipoMaterial();
    this.cargarMateriales();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  cargarTipoMaterial() {
    this.responService.cargaTiposMaterial()
    .subscribe((data: TipoMaterial[]) => {
      this.tipoMateriales = data;
    });
  }

  cargarMateriales() {
    this.responService.obtenerMateriales( this.desde )
    .subscribe((data: Material[]) => {
      this.materiales = data;
      this.totalRegistros = data[0].total;
      this.cargando = false;
    });
  }

  guardar( material: Material ) {
    this.responService.modificarMaterial( material )
    .subscribe(() => {  });
  }

  buscar( termino: string ) {
    this.cargando = true;
    if ( termino.length <= 0 ) {
      this.cargarMateriales();
      return;
    } else if ( termino.length > 3 ) {
      this.cargando = true;
      this.responService.buscarMateriales( termino )
              .subscribe( (data: Material[]) => {
                this.materiales = data;
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
    this.cargarMateriales();

  }

}
