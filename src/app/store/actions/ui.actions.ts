import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[iu Loading] Cargando ...';
export const DESACTIVAR_LOADING = '[iu Loading] Fin de Cargando ...';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;

}

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;

}

export type acciones = ActivarLoadingAction | DesactivarLoadingAction;
