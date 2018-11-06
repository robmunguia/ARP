import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './reducers/iu.reducer';
import * as fromAuth from './reducers/auth.reducer';


export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducers,
    auth: fromAuth.authReducer
};
