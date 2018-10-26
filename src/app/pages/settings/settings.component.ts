import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    this.router.navigate(['/config/permisos']);
  }

}
