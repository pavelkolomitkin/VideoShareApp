import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Video} from '../models/video.model';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

declare var _: any;

@Injectable()
export class VideoService
{
    constructor(private http: HttpClient) {}

    public create(video: Video): Observable<Video>
    {
        const body = _.pick(video, 'url', 'title', 'description', 'location', 'time');
        return this.http.post<{video: Video}>('/video', body).pipe(
            map(result => result.video)
        );
    }

    // public update(video: Video): Observable<Video>
    // {
    //     return this.http.put<{video: Video}>('/video/' + video.id, video).pipe(
    //         map(result => result.video)
    //     );
    // }
    //
    // public remove(video: Video): Observable
    // {
    //     return this.http.delete('/video/' + video.id);
    // }
}
