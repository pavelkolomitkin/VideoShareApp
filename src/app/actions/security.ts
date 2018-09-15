import {Action} from '@ngrx/store';

import { UserCredentials } from '../models/user-credentials.model';
import { User } from '../models/user.model';

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_TOKEN_VERIFY_SUCCESS = 'USER_TOKEN_VERIFY_SUCCESS';
export const USER_TOKEN_VERIFY_ERROR = 'USER_TOKEN_VERIFY_ERROR';

export const USER_LOGOUT = 'USER_LOGOUT';


export class UserLoginStart implements Action {

    readonly type = USER_LOGIN_START;

    constructor(public payload: UserCredentials) {}
}

export class UserLoginSuccess implements Action {
    readonly type = USER_LOGIN_SUCCESS;

    constructor(public user: User, public token: string) {}
}

export class UserLoginError implements Action {

    readonly type = USER_LOGIN_ERROR;

    constructor(public errors: Object) {}
}

export class UserLogout implements Action {

    readonly type = USER_LOGOUT;

}

export class UserTokenVerifySuccess implements Action
{
    readonly type = USER_TOKEN_VERIFY_SUCCESS;

    constructor(public user: User, public token: string) {}
}

export class UserTokenVerifyError implements Action
{
    readonly type = USER_TOKEN_VERIFY_ERROR;
}

export type SecurityActions =
    UserLoginStart
    | UserLoginSuccess
    | UserLoginError
    | UserLogout
    | UserTokenVerifySuccess
    | UserTokenVerifyError
    ;
