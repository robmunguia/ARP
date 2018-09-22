import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modulos
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RequisicionComponent } from './pages/requisiciones/requisicion.component';
import { NuevoUsuarioComponent } from './pages/usuarios/nuevo-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    PagesComponent,
    RequisicionComponent,
    NuevoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceModule,
    PagesModule,
    FormsModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
