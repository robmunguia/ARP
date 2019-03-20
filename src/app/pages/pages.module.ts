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
import { PipesModule } from '../pipes/pipes.module';
// import { FechaPipe } from '../pipes/fecha.pipe';
// import { ImagenPipe } from '../pipes/imagen.pipe';

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
import { ClientesComponent } from './clientes/clientes.component';
import { SettingsComponent } from './settings/settings.component';
import { ListadoComponent } from './usuarios/listado.component';
import { PermisosComponent } from './settings/permisos.component';
import { GruposComponent } from './settings/grupos.component';
import { ParametrosComponent } from './settings/parametros.component';
import { ModulosComponent } from './settings/modulos.component';
import { PerfilComponent } from './user/perfil.component';
import { GeneralesComponent } from './reportes/generales/generales.component';
import { DetallesComponent } from './requisiciones/detalles.component';
import { TipoMaterialComponent } from './responsivas/tipo-material/tipo-material.component';
import { MaterialComponent } from './responsivas/material/material.component';
import { FechaComponent } from './reportes/fecha/fecha.component';

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
  ClientesComponent,
  SettingsComponent,
  ListadoComponent,
  PermisosComponent,
  GruposComponent,
  ParametrosComponent,
  ModulosComponent,
  PerfilComponent,
  GeneralesComponent,
  DetallesComponent,
  TipoMaterialComponent,
  MaterialComponent,
  FechaComponent
],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    ColorPickerModule,
    NgbModule,
    PipesModule
  ],
  providers: []
})
export class PagesModule { }
