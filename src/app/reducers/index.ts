import {isDevMode} from '@angular/core';

import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromSecurity from './security';

export interface State {
    security: fromSecurity.State;
}


const reducers = {
    security: fromSecurity.reducer
};


const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (isDevMode()) {
        return developmentReducer(state, action);
    } else {
        return productionReducer(state, action);
    }
}
