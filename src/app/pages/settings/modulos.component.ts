import { Component, OnInit } from '@angular/core';
import { Modulos } from '../../models/modulos.model';
import { ModulosService } from 'src/app/services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styles: []
})
export class ModulosComponent implements OnInit {

  modulos: Modulos[] = [];
  cargando = false;

  constructor(public moduloService: ModulosService) { }

  ngOnInit() {
    this.cargarModulos();
  }

  cargarModulos() {
    this.cargando = true;
    this.moduloService.cargarModulos()
    .subscribe((data: Modulos[]) => {
      this.modulos = data;
      this.cargando = false;
    });
  }

  crear() {

    swal({
      title: 'Ingrese el nombre',
      input: 'text',
      inputPlaceholder: 'Ingresar nombre',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if ( value ) {
            this.guardarSucursal( value );
            resolve();
          } else {
            resolve('Ingrese el nombre de la sucursal');
          }
        });
      }
    });

  }

  guardarSucursal( nombre: string ) {
    const modulo = new Modulos(0, nombre);
    this.moduloService.guardarModulo( modulo )
    .subscribe(() => { this.cargarModulos(); });
  }

  modificar( modulo: Modulos ) {
    this.moduloService.modificarModulo( modulo )
    .subscribe(() => { });
  }

}
