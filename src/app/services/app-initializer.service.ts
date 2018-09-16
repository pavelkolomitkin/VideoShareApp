import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {SecurityService} from '../security/services/SecurityService';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {UserTokenVerifyError, UserTokenVerifySuccess} from '../actions/security';
import {of} from 'rxjs/observable/of';

export function appInitializeHandler(initializer: AppInitializerService)
{
    return () => {
        return initializer.initialize();
    };
}

@Injectable()
export class AppInitializerService
{
    constructor(
        private localStorageService: LocalStorageService,
        private securityService: SecurityService,
        private store: Store<State>) {}

    public initialize(): Promise<any>
    {
        return new Promise<any>((resolve, reject) => {
            const token = this.localStorageService.get('token');
            if (token === null)
            {
                resolve(true);
                return;
            }

            this.securityService.verifyToken(token)
                .subscribe(
                    (result) => {
                        const { user } = result;
                        this.store.dispatch(new UserTokenVerifySuccess(user, token));
                        resolve(true);
                    },
                    (error) => {
                        this.localStorageService.remove('token');
                        this.store.dispatch(new UserTokenVerifyError());
                        resolve(true);
                    }
                    );

        });
    }
}