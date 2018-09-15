import {Injectable} from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {SecurityActions, USER_LOGIN_START, UserLoginError, UserLoginStart, UserLoginSuccess} from '../../actions/security';
import {SecurityService} from '../services/SecurityService';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {of} from 'rxjs/observable/of';


@Injectable()
export class SecurityEffects {

    @Effect()
    login: Observable<Action> = this.actions.pipe(
        ofType(USER_LOGIN_START),
        mergeMap((action: UserLoginStart) => {

                const { payload } = action;

                return this
                    .securityService
                    .auth(payload.login, payload.password)
                    .pipe(
                        map(result => new UserLoginSuccess(result.user, result.token)),
                        catchError( (error) => {
                            return of(new UserLoginError(error.error.errors));
                        })
                    );
            }
        )
    );
    constructor(private securityService: SecurityService, private actions: Actions) {}
}
