import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/service.index';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: Usuario = new Usuario();

  constructor(
    private _usuarioService: AuthService,
    private router: Router ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(forma: NgForm) {

    this._usuarioService.iniciarSesion( this.user )
    .subscribe((user: Usuario) => {
      this.user = user;
      this.router.navigate(['/requis']);
    }, error => {
      swal('Aviso!', 'Usuario o contraseña incorrectos', 'warning');
    });

  }

}
