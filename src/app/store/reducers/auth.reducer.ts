

import * as fromAuth from '../actions/auth.actions';
import { Usuario } from 'src/app/models/models.index';

export interface AuthState {
    usuario: Usuario;
}

const estadoInicial: AuthState = {
    usuario: localStorage.getItem('usuario') ?  JSON.parse(localStorage.getItem('usuario')) : null
};

export function authReducer( state = estadoInicial, action: fromAuth.acciones ): AuthState {
    switch ( action.type ) {

        case fromAuth.SET_USER:
            return {
                usuario: { ... action.usuario }
            };

        default:
            return state;
    }
}
