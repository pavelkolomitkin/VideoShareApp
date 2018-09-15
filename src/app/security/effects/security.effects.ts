import {Injectable} from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {
    SecurityActions,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS, USER_LOGOUT,
    UserLoginError,
    UserLoginStart,
    UserLoginSuccess, UserLogout
} from '../../actions/security';
import {SecurityService} from '../services/SecurityService';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';


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
                        map((result) =>
                            {
                                return new UserLoginSuccess(result.user, result.token);
                            }),
                        catchError( (error) => {
                            return of(new UserLoginError(error.error.errors));
                        })
                    );
            }
        )
    );

    @Effect({ dispatch: false })
    loginSuccess: Observable<Action> = this.actions.pipe(
        ofType(USER_LOGIN_SUCCESS),
        tap((action: UserLoginSuccess) => {
            const { token } = action;
            this.localStorageService.set('token', token);
            this.router.navigate(['/map']);
        })
    );

    @Effect()
    logout: Observable<Action> = this.actions.pipe(
        ofType(USER_LOGOUT),
        tap((action: UserLogout) => {
           this.localStorageService.remove('token');
        })
    );

    constructor(
        private securityService: SecurityService,
        private actions: Actions,
        private localStorageService: LocalStorageService,
        private router: Router
    ) {}
}
