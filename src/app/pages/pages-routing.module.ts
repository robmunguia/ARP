import { NgModule, Component } from '@angular/core';
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
import { ConfirmacionesComponent } from './confirmaciones/confirmaciones.component';
import { ModificarComponent } from './requisiciones/modificar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { SettingsComponent } from './settings/settings.component';
import { ListadoComponent } from './usuarios/listado.component';
import { GruposComponent } from './settings/grupos.component';
import { PermisosComponent } from './settings/permisos.component';
import { PermisoComponent } from './settings/permiso.component';
import { ParametrosComponent } from './settings/parametros.component';
import { ModulosComponent } from './settings/modulos.component';
import { PerfilComponent } from './user/perfil.component';
import { GeneralesComponent } from './reportes/generales/generales.component';
import { DetallesComponent } from './requisiciones/detalles.component';
import { TipoMaterialComponent } from './responsivas/tipo-material/tipo-material.component';
import { MaterialComponent } from './responsivas/material/material.component';
import { MaterialesComponent } from './responsivas/material/materiales.component';
import { EntregaComponent } from './responsivas/entrega.component';
import { RetornoComponent } from './responsivas/retorno.component';
import { FechaComponent } from './reportes/fecha/fecha.component';


const Rutas: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'home', component: DashboardComponent, data: { modulo: ['Tablero', 'Consultar'] } },
            { path: 'requis', component: RequisicionesComponent, data: { modulo: ['Requisiciones', 'Consultar'] } },
            { path: 'requis/add', component: RequisicionComponent, data: { modulo: ['Requisiciones', 'Agregar'] } },
            { path: 'detalle/:id', component: DetallesComponent, data: { modulo: ['Requisiciones', 'Detalles'] } },
            { path: 'usuarios', component: ListadoComponent, data: { modulo: ['UsuariosSucursal', 'Consultar'] } },
            { path: 'reporte/general', component: GeneralesComponent, data: { modulo: ['reporte/general', 'Consultar'] } },
            { path: 'reporte/historico', component: FechaComponent, data: { modulo: ['reporte/historial', 'Consultar'] } },
            { path: 'users/:id', component: NuevoUsuarioComponent, data: { modulo: ['Usuarios', 'Modificar'] } },
            { path: 'users', component: UsuariosComponent, data: { modulo: ['Usuarios', 'Consultar'] } },
            { path: 'perfil', component: PerfilComponent, data: { modulo: ['Usuarios', 'Consultar'] } },
            { path: 'sucursales', component: SucursalesComponent, data: { modulo: ['Sucursales', 'Consultar'] } },
            { path: 'nomina', component: TipoNominaComponent, data: { modulo: ['Nomina', 'Consultar'] } },
            { path: 'envio/:id', component: EnvioComponent, data: { modulo: ['Envios', 'Consultar'] } },
            { path: 'confirmar/:id', component: ConfirmacionesComponent, data: { modulo: ['Confirmaciones', 'Consultar'] } },
            { path: 'proceso', component: ProcRequisicionComponent, data: { modulo: ['Abrir/CancelarRequi', 'Consultar'] } },
            { path: 'modificar', component: ModificarComponent, data: { modulo: ['ModificarRequi', 'Consultar'] } },
            { path: 'clientes', component: ClientesComponent, data: { modulo: ['ClientesSucursal', 'Consultar'] } },
            { path: 'tipos/material', component: TipoMaterialComponent, data: { modulo: ['TiposMaterial', 'Consultar'] } },
            { path: 'material', component: MaterialesComponent, data: { modulo: ['Materiales', 'Consultar'] } },
            { path: 'material/nuevo', component: MaterialComponent, data: { modulo: ['Material', 'Consultar'] } },
            { path: 'entregas', component: EntregaComponent, data: { modulo: ['Entrega', 'Consultar'] } },
            { path: 'retorno', component: RetornoComponent, data: { modulo: ['Retorno', 'Consultar'] } },
            {
                path: 'config',
                component: SettingsComponent,
                data: { modulo: ['Administrador', 'Consultar'] },
                children: [
                    { path: 'grupos', component: GruposComponent, data: { modulo: ['Administrador', 'Consultar'] } },
                    { path: 'permisos', component: PermisosComponent, data: { modulo: ['Administrador', 'Consultar'] } },
                    { path: 'permisos/add', component: PermisoComponent, data: { modulo: ['Administrador', 'Consultar'] } },
                    { path: 'modulos', component: ModulosComponent, data: { modulo: ['Administrador', 'Consultar'] } }
                ]
            }
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
