import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/service.index';
import { EnvConfirmados } from 'src/app/models/models.index';
import { Fecha } from '../../models/date.model';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styles: []
})
export class DiarioComponent implements OnInit {

  lstProcesos: EnvConfirmados[] = [];
  proceso: EnvConfirmados = new EnvConfirmados();
  today: Fecha = new Fecha();

  TotalProceso = 0;
  TotalEnviado = 0;
  TotalConfirm = 0;

  constructor(public clientService: ClientesService) { }

  ngOnInit() {
  }

  addProceso() {
    if ( this.proceso.proceso !== 0 ) {
      this.clientService.obtenerCliente( this.proceso.cliente )
      .subscribe((data: EnvConfirmados) => {
        if (data !== null) {
          this.proceso.cliente = data.cliente;
          data.proceso = this.proceso.proceso;
          if ( !this.lstProcesos.some((item) => item.cliente === data.cliente) ) {
            this.lstProcesos.push(data);
          }
          this.contador();
          this.proceso = new EnvConfirmados();
        }
      });
    }
  }

  contador() {
    this.TotalProceso = 0;
    this.TotalEnviado = 0;
    this.TotalConfirm = 0;
    for (const env of this.lstProcesos) {
      this.TotalProceso += Number(env.proceso.toString());
      this.TotalEnviado += Number(env.enviados.toString());
      this.TotalConfirm += Number(env.confirmados.toString());
    }
  }

}
