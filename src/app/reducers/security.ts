import * as actions from '../actions/security';
import {UserCredentials} from '../models/user-credentials.model';
import {User} from '../models/user.model';

export interface State {
    authCredentials: UserCredentials;
    user: User;
    token: string;
    authErrors: Object;
}

const initialState: State = {
    authCredentials: null,
    user: null,
    token: null,
    authErrors: {}

};


export function reducer(state = initialState, action: actions.SecurityActions): State {

    switch (action.type) {
        case actions.USER_LOGIN_START:

            return {...state, authCredentials: action.payload};

        case actions.USER_LOGIN_SUCCESS:

            return {...state, user: action.user, token: action.token, authErrors: {}};

        case actions.USER_TOKEN_VERIFY_SUCCESS:

            return {...state, user: action.user, token: action.token, authErrors: {}};

        case actions.USER_LOGIN_ERROR:

            return { ...state, authErrors: action.errors };

        case actions.USER_LOGOUT:

            return { ...state, token: null, user: null, authCredentials: null};

        case actions.USER_TOKEN_VERIFY_ERROR:

            return { ...state, token: null, user: null, authCredentials: null};

        default:

            return state;

    }
}
