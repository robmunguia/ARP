import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _authService: AuthService ) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
  }

}
