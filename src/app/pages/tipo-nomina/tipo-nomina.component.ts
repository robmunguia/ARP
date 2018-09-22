import { Component, OnInit } from '@angular/core';
import { TipoNominaService } from '../../services/service.index';
import { TipoNomina } from '../../models/models.index';

@Component({
  selector: 'app-tipo-nomina',
  templateUrl: './tipo-nomina.component.html',
  styles: []
})
export class TipoNominaComponent implements OnInit {

  tnominas: TipoNomina[] = [];
  cargando: boolean;

  constructor(public _tnominaService: TipoNominaService) { }

  ngOnInit() {
    this.cargarTNominas();
  }

  cargarTNominas() {
    this.cargando = true;

    this._tnominaService.obtieneTiposNominas()
    .subscribe((data: TipoNomina[]) => {
      this.tnominas = data;
      this.cargando = false;
    });
  }

  guardar( nomina: TipoNomina ) {
    this._tnominaService.guardarTNomina( nomina )
    .subscribe(() => { });
  }

}