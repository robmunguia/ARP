import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    AuthService,
    UsuariosService,
    RolesService,
    SucursalesService,
    ClientesService,
    TipoNominaService,
    RequisicionesService,
    EnviosService
 } from './service.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        UsuariosService,
        RolesService,
        SucursalesService,
        ClientesService,
        TipoNominaService,
        RequisicionesService,
        EnviosService
    ],
    declarations: []
})
export class ServiceModule { }
