import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proc-requisicion',
  templateUrl: './proc-requisicion.component.html',
  styles: []
})
export class ProcRequisicionComponent implements OnInit {

  tipo = 'cancelar';
  requis = [];

  constructor() { }

  ngOnInit() {
  }

  procesar() {
    console.log(this.requis);
  }

}
