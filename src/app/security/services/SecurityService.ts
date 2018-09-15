import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class SecurityService
{
    constructor(private http: HttpClient) {}

    public auth(email: string, password: string): Observable<{user: User, token: string}>
    {
        return this.http.post<{user: User, token: string}>('login', { email, password})
            .pipe(
                map((result) => {
                    return {user: result.user, token: result.token};
                })
            );
    }
}
