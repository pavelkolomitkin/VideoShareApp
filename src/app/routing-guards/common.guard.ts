import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store, select} from '@ngrx/store';
import {State} from '../reducers';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CommonGuard implements CanActivate, CanActivateChild {

    constructor (private store: Store<State>, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean
    {
        return this.getAuthChecker();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.getAuthChecker();
    }

    private getAuthChecker()
    {
        return this.store.pipe(
            select(state => state.security.user),
            map((user) => {
                if (user !== null)
                {
                    return true;
                }
                else
                {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}