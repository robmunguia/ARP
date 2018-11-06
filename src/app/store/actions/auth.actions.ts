import { Action } from '@ngrx/store';
import { Usuario } from 'src/app/models/models.index';


export const SET_USER = '[Auth] Cargar Usuario';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public usuario: Usuario ) { }
}

export type acciones = SetUserAction;
