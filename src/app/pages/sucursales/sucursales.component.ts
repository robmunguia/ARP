import { Component, OnInit } from '@angular/core';
import { Sucursales } from '../../models/sucursal.model';
import { SucursalesService, AuthService, PermisosService } from '../../services/service.index';
import swal from 'sweetalert2';
import { Subscription } from 'node_modules/rxjs';
import { Permisos } from 'src/app/models/models.index';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styles: []
})
export class SucursalesComponent implements OnInit {

  permiso: Permisos = new Permisos();
  sucursales: Sucursales[] = [];
  cargando = false;
  subscription: Subscription;

  constructor(public _sucursalService: SucursalesService,
              public permService: PermisosService,
              public authService: AuthService) {
                this.cargarPermiso( 'Sucursales' );
  }

  ngOnInit() {
    this.cargarSucursales();
  }

  cargarPermiso( modulo: string ) {
    return this.permService.cargarPermiso( modulo )
    .subscribe((data: Permisos) => {
      this.permiso = data;
    });
  }

  cargarSucursales() {
    this.cargando = true;
    this._sucursalService.obtenerSucursales()
    .subscribe((data: Sucursales[]) => {
      this.sucursales = data;
      this.cargando = false;
    });
  }

  crearSucursal() {

    swal({
      title: 'Ingrese el nombre',
      input: 'text',
      inputPlaceholder: 'Ingresar nombre',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
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
    const sucursal: Sucursales = new Sucursales(0, nombre);
    this._sucursalService.guardarSucursal( sucursal )
    .subscribe(() => {
      this.cargarSucursales();
    });
  }

  modificarSucursal( sucursal: Sucursales ) {
    this._sucursalService.modificarSucursal( sucursal )
    .subscribe(() => { } );
  }

}
