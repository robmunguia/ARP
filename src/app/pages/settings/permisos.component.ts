import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../services/service.index';
import { Permisos } from '../../models/models.index';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: []
})
export class PermisosComponent implements OnInit {

  desde = 0;
  totalRegistros = 0;
  permisos: Permisos[] = [];
  cargando = false;

  constructor(public permiService: PermisosService) { }

  ngOnInit() {
    this.cargarPermisos();
  }

  cargarPermisos() {
    this.cargando = true;
    this.permiService.obtenerPermisos( this.desde )
    .subscribe((data: any) => {
      this.permisos = data;
      this.totalRegistros = data.Total;
      this.cargando = false;
    });
  }

  buscar( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarPermisos();
      return;
    } else if ( termino.length > 3 ) {
      this.cargando = true;
      this.permiService.buscarPermisos( termino )
              .subscribe( (data: any) => {
                this.permisos = data;
                this.cargando = false;
              });
    }
  }

  guardar( permiso: Permisos ) {
    this.permiService.actualizar( permiso )
    .subscribe(() => { });
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
    this.cargarPermisos();

  }

}
