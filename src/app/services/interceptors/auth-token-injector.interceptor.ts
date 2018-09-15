import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthTokenInjectorInterceptor implements HttpInterceptor
{
    constructor (private store: Store<State>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        //this.store.select();
        // TODO Inject the auth token in header here!x

        const tokenizedRequest = req.clone();
        return next.handle(tokenizedRequest);
    }
}