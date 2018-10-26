import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { Usuario, Perfil } from 'src/app/models/models.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  perfil: Perfil = new Perfil();

  constructor(public authService: AuthService) {
    this.usuario = this.authService.usuario;
    this.cargarPerfil();
  }

  ngOnInit() {
  }

  cargarPerfil() {
    this.authService.cargarPerfil( this.usuario )
    .subscribe((data: Perfil) => {
      this.perfil = data;
    });
  }

  cambiarPassword() {
    if ( this.usuario.NewPassword === this.usuario.ConfPassword ) {
      this.authService.cambiarClave( this.usuario )
      .subscribe((msg: string) => {
        if (msg === 'OK') {
          swal('Contraseña Actualizada', this.usuario.NombreUsuario, 'success');
          this.usuario.Password = '';
          this.usuario.NewPassword = '';
          this.usuario.ConfPassword = '';
        } else {
          swal(msg, this.usuario.NombreUsuario, 'warning');
        }
      });
    } else {
      swal('Las contraseñas no coinciden', 'La nueva contraseña y la confirmación deben ser iguales', 'warning' );
    }
  }

}
