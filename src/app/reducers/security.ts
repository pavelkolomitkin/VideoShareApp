import * as actions from '../actions/security';
import {UserCredentials} from '../models/user-credentials.model';
import {User} from '../models/user.model';
import {FormError} from '../models/form-error.model';

export interface State {
    authCredentials: UserCredentials;
    user: User;
    token: string;
    authErrors: FormError[];
}

const initialState: State = {
    authCredentials: null,
    user: null,
    token: null,
    authErrors: []

};


export function reducer(state = initialState, action: actions.SecurityActions): State {

    switch (action.type) {
        case actions.USER_LOGIN_START:

            return {...state, authCredentials: action.payload};

            break;

        case actions.USER_LOGIN_SUCCESS:

            return {...state, user: action.user, token: action.token};

            break;

        case actions.USER_LOGIN_ERROR:

            return { ...state, authErrors: action.errors };

            break;

        default:

            return state;

    }
}
