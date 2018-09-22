import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequisicionesComponent } from './requisiciones/requisiciones.component';
import { AuthGuard } from '../services/guard/auth.guard';
import { RequisicionComponent } from './requisiciones/requisicion.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { TipoNominaComponent } from './tipo-nomina/tipo-nomina.component';
import { EnvioComponent } from './envios/envio.component';
import { ProcRequisicionComponent } from './requisiciones/proc-requisicion.component';


const Rutas: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'home', component: RequisicionesComponent },
            { path: 'requis', component: RequisicionesComponent },
            { path: 'requis/add', component: RequisicionComponent },
            { path: 'users', component: UsuariosComponent },
            { path: 'users/:id', component: NuevoUsuarioComponent },
            { path: 'sucursales', component: SucursalesComponent },
            { path: 'nomina', component: TipoNominaComponent },
            { path: 'envio/:id', component: EnvioComponent },
            { path: 'proceso', component: ProcRequisicionComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot( Rutas, { useHash: true } )
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule { }
