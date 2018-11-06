import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/service.index';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { Subscription } from 'rxjs';

declare function init_plugins();


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  user: Usuario = new Usuario();
  cargando: boolean;
  subscription: Subscription = new Subscription();

  constructor(
    private _usuarioService: AuthService,
    public store: Store<AppState>,
    private router: Router ) { }

  ngOnInit() {
    init_plugins();
    this.subscription = this.store.select('ui')
                        .subscribe( ui => {
                          this.cargando = ui.isLoading;
                        });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
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
