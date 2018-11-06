
import * as fromUI from '../actions/ui.actions';


export interface State {
    isLoading: boolean;
}

const initSatate: State = {
    isLoading: false
};

export function uiReducers( state = initSatate, action: fromUI.acciones ): State {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
}
