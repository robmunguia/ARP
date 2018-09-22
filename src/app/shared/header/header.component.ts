import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: Usuario = new Usuario();

  constructor(public _authService: AuthService ) { }

  ngOnInit() {
    this.user = this._authService.usuario;
  }

}
