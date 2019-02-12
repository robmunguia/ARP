import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/responsivas/material.model';
import { Permisos } from '../../models/permisos.model';
import { ResponsivasService } from '../../services/responsivas/responsivas.service';
import { PermisosService } from '../../services/permisos/permisos.service';
import { Entrega } from '../../models/responsivas/entrega.model';
import { Colaborador } from 'src/app/models/responsivas/colaborador.model';
import { DetalleEntrega } from 'src/app/models/responsivas/detentrega.model';
import { Tallas } from '../../models/responsivas/tallas.model';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styles: []
})
export class EntregaComponent implements OnInit {

  permiso: Permisos = new Permisos();
  entrega: Entrega = new Entrega();
  materiales: Material[] = [];
  detalle: DetalleEntrega = new DetalleEntrega();
  tallas: Tallas = new Tallas();
  folio = 0;
  noEmpleado = 0;
  cantidad = 0;
  cargando = false;
  showColaborador = false;
  showTalla = false;
  showDetalle = false;

  constructor(public responService: ResponsivasService,
              public permService: PermisosService) {
                this.cargarPermiso( 'Responsivas' );
              }

  ngOnInit() {
    this.cargarMateriales();
    this.cargarTallas();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  guardar() {
    this.cargando = true;
    this.responService.generarResponsiva( this.entrega )
    .subscribe((data: Entrega) => {
      this.cargando = false;
      this.entrega = data;
      this.generaPDF();
    });
  }

  buscarFolio() {
    this.responService.obtenerEntrega( this.folio )
    .subscribe((data: Entrega) => {
      this.entrega = data;
    });
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.cargarColaborador( this.noEmpleado );
    }
  }
  onKeydownFolio(event) {
    if (event.key === 'Enter') {
      this.buscarFolio();
    }
  }

  cargarTallas() {
    this.responService.cargarTallas()
    .subscribe((data: Tallas) => {
      this.tallas = data;
    });
  }

  cargarMateriales() {
    this.responService.cargaMaterialActivos()
    .subscribe((data: Material[]) => {
      this.materiales = data;
    });
  }

  cargarColaborador( noEmpleado: number ) {
    this.showColaborador = false;
    this.entrega.colaborador = new Colaborador();
    this.responService.cargarColaborador( noEmpleado )
    .subscribe((data: any) => {
      if (data.codigo !== 0) {
        this.entrega.colaborador = data;
        this.showColaborador = true;
      }
    });
  }

  agregarMaterial() {
    if ( this.detalle.cantidad > 0 && this.detalle.material.id !== 0 ) {
      this.showDetalle = true;
      this.entrega.detalle.push( this.detalle );
      this.detalle = new DetalleEntrega();
    }
  }

  removerMaterial( number: number ) {
    this.entrega.detalle.splice( number, 1 );
  }

  generaPDF() {
    this.cargando = true;
    this.responService.generarPDF( this.entrega )
      .subscribe((data: any) => {
        this.cargando = false;
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL, '_blank');
    });
  }

  nuevo() {
    this.entrega = new Entrega();
    this.detalle = new DetalleEntrega();
    this.folio = 0;
    this.noEmpleado = 0;
    this.cantidad = 0;
    this.cargando = false;
    this.showColaborador = false;
    this.showTalla = false;
    this.showDetalle = false;
  }

}
