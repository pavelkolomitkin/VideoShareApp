import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {VideoService} from '../services/video.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
    LOAD_VIDEO_LIST_FROM_BOUNDS_START, LoadVideoListFromBoundsError, LoadVideoListFromBoundsStart, LoadVideoListFromBoundsSuccess,
    VIDEO_CREATION_START,
    VIDEO_CREATION_SUCCESS,
    VideoCreationError,
    VideoCreationStart,
    VideoCreationSuccess
} from '../actions/video';
import {mergeMap, catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Video} from '../models/video.model';


@Injectable()
export class VideoEffects
{
    @Effect()
    creationStart: Observable<Action> = this.actions.pipe(
        ofType(VIDEO_CREATION_START),
        mergeMap((action: VideoCreationStart) => {
            const { video } = action;

            return this.videoService.create(video).pipe(
                map((newVideo) => {
                    return new VideoCreationSuccess(newVideo);
                }),
                catchError((error) => {
                    return of(new VideoCreationError(error.error.errors));
                })
            );
        })
    );

    @Effect()
    loadVideoFromMapBoundsStart: Observable<Action> = this.actions.pipe(
        ofType(LOAD_VIDEO_LIST_FROM_BOUNDS_START),
        mergeMap((action: LoadVideoListFromBoundsStart) => {
            const { bounds } = action;

            return this.videoService.getListFromBounds(bounds).pipe(
                map((list: Array<Video>) => {
                    return new LoadVideoListFromBoundsSuccess(list);
                }),
                catchError((errors) => {
                    return of(new LoadVideoListFromBoundsError(errors));
                })
            );
        })
    );
    // creationSuccess: Observable<Action> = this.actions.pipe(
    //     ofType(VIDEO_CREATION_SUCCESS),
    //     mergeMap((action: VideoCreationSuccess) => {
    //         const { video } = action;
    //
    //     })
    // );

    constructor(
        private actions: Actions,
        private videoService: VideoService,
        private router: Router
    ) {}
}