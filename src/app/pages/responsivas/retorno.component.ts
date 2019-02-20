import { Component, OnInit } from '@angular/core';
import { ResponsivasService } from '../../services/responsivas/responsivas.service';
import { PermisosService } from '../../services/permisos/permisos.service';
import { Permisos } from '../../models/permisos.model';
import { DetalleEntrega } from '../../models/responsivas/detentrega.model';
import { Entrega } from '../../models/responsivas/entrega.model';

@Component({
  selector: 'app-retorno',
  templateUrl: './retorno.component.html',
  styles: []
})
export class RetornoComponent implements OnInit {

  permiso: Permisos = new Permisos();
  noEmpleado = 0;
  entregas: DetalleEntrega[] = [];
  imprTodos = false;
  retorTodos = false;
  verRetorno = false;
  verImpr = false;
  cargando = false;

  constructor(public responService: ResponsivasService,
    public permService: PermisosService) {
      this.cargarPermiso( 'Responsivas' );
    }

  ngOnInit() {
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.buscarMateriales();
    }
  }

  buscarMateriales() {
    this.cargando = true;
    this.responService.cargarEntregasEmpleado( this.noEmpleado )
    .subscribe((data: DetalleEntrega[]) => {
      this.cargando = false;
      this.entregas = data;
    });
  }

  SelecTodos() {
    for ( const entr of this.entregas ) {
      entr.imprimir = this.imprTodos;
    }
    this.verBotones();
  }
  RetorTodos() {
    for ( const entr of this.entregas ) {
      entr.retorno = this.retorTodos;
    }
    this.verBotones();
  }

  verBotones() {
    this.verRetorno = false;
    this.verImpr = false;
    for ( const entr of this.entregas ) {
      if ( entr.retorno ) {
        this.verRetorno = true;
      }
      if ( entr.imprimir ) {
        this.verImpr = true;
      }
    }
  }

  retornar() {
    this.cargando = true;
    this.responService.retornar( this.entregas )
    .subscribe((data: any) => {
      this.cargando = false;
      this.buscarMateriales();
    });
  }

  verPDF( folio: number ) {
    this.cargando = true;
    this.responService.verPDF( folio )
      .subscribe((data: any) => {
        this.cargando = false;
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL, '_blank');
    });
  }

  verMultiplePDF() {
    this.cargando = true;
    this.responService.generarMultiplePDF( this.entregas )
    .subscribe((data: any) => {
      this.cargando = false;
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });
  }

}
