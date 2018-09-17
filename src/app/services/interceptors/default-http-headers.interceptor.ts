import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class DefaultHttpHeadersInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const headeredRequest = req.clone({
            headers: req
                .headers
                .set('Content-Type', 'application/json')
                .set('Time-Offset', String((new Date().getTimezoneOffset() / 60)))
        });

        return next.handle(headeredRequest);
    }
}