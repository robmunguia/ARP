import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposComponent } from './grupos.component';
import { PermisosComponent } from './permisos.component';
import { ParametrosComponent } from './parametros.component';

const Rutas: Routes = [
    { path: 'grupos', component: GruposComponent },
    { path: 'permisos', component: PermisosComponent },
    { path: 'parametros', component: ParametrosComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot( Rutas, { useHash: true } )
    ],
    exports: [
        RouterModule
    ]
})
export class SettingsRoutingModule { }
