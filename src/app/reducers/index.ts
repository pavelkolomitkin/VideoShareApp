import {isDevMode} from '@angular/core';

import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromSecurity from './security';
import * as fromVideo from './video';

export interface State {
    security: fromSecurity.State;
    video: fromVideo.State;
}


export const reducer = {
    security: fromSecurity.reducer,
    video: fromVideo.reducer
};


//const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const developmentReducer: ActionReducer<State> = combineReducers(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);
// const combinedReducer: ActionReducer<State> = combineReducers(reducers);

// export function reducer(state: any, action: any) {
//     return combinedReducer(state, action);
// }
