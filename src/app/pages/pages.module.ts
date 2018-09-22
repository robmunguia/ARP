import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Rutas
import { PagesRoutingModule } from './pages-routing.module';

// ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// color-picker
import { ColorPickerModule } from 'ngx-color-picker';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Pipes
import { FechaPipe } from '../pipes/fecha.pipe';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { RequisicionesComponent } from './requisiciones/requisiciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { TipoNominaComponent } from './tipo-nomina/tipo-nomina.component';
import { EnviosComponent } from './envios/envios.component';
import { EnvioComponent } from './envios/envio.component';
import { ProcRequisicionComponent } from './requisiciones/proc-requisicion.component';
import { ConfirmacionesComponent } from './confirmaciones/confirmaciones.component';

@NgModule({
  declarations: [
  RequisicionesComponent,
  UsuariosComponent,
  SucursalesComponent,
  TipoNominaComponent,
  EnviosComponent,
  EnvioComponent,
  ProcRequisicionComponent,
  ConfirmacionesComponent,
  FechaPipe
],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    ColorPickerModule,
    NgbModule
  ],
  providers: []
})
export class PagesModule { }
