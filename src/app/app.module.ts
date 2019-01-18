import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Charts
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Pipes
import { PipesModule } from './pipes/pipes.module';

// Modulos
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { PagesModule } from './pages/pages.module';

// NGRX (Store, Reducer)
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';
// DevTools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RequisicionComponent } from './pages/requisiciones/requisicion.component';
import { NuevoUsuarioComponent } from './pages/usuarios/nuevo-usuario.component';
import { ModificarComponent } from './pages/requisiciones/modificar.component';
import { PermisoComponent } from './pages/settings/permiso.component';
import { DiarioComponent } from './pages/dashboard/diario.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    PagesComponent,
    RequisicionComponent,
    NuevoUsuarioComponent,
    ModificarComponent,
    PermisoComponent,
    DiarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceModule,
    PagesModule,
    PipesModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
