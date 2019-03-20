import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import {
    AuthService,
    UsuariosService,
    RolesService,
    SucursalesService,
    ClientesService,
    TipoNominaService,
    RequisicionesService,
    EnviosService,
    ConfirmacionService,
    PermisosService,
    ModulosService,
    TableroService,
    ResponsivasService,
    ReportesService
 } from './service.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        AuthService,
        UsuariosService,
        RolesService,
        SucursalesService,
        ClientesService,
        TipoNominaService,
        RequisicionesService,
        EnviosService,
        ConfirmacionService,
        PermisosService,
        ModulosService,
        TableroService,
        ResponsivasService,
        ReportesService
    ],
    declarations: []
})
export class ServiceModule { }
