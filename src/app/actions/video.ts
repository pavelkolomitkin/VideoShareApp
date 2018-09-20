import {Action} from '@ngrx/store';
import {Video} from '../models/video.model';
import {MapBounds} from '../models/map-bounds.model';

export const VIDEO_CREATION_START = 'VIDEO_CREATION_START';
export const VIDEO_CREATION_SUCCESS = 'VIDEO_CREATION_SUCCESS';
export const VIDEO_CREATION_ERROR = 'VIDEO_CREATION_ERROR';

export const LOAD_VIDEO_LIST_FROM_BOUNDS_START = 'LOAD_VIDEO_LIST_FROM_BOUNDS_START';
export const LOAD_VIDEO_LIST_FROM_BOUNDS_SUCCESS = 'LOAD_VIDEO_LIST_FROM_BOUNDS_SUCCESS';
export const LOAD_VIDEO_LIST_FROM_BOUNDS_ERROR = 'LOAD_VIDEO_LIST_FROM_BOUNDS_ERROR';


export class VideoCreationStart implements Action
{
    readonly type = VIDEO_CREATION_START;

    constructor(public video: Video) {}
}


export class VideoCreationSuccess implements Action
{
    readonly type = VIDEO_CREATION_SUCCESS;

    constructor(public video: Video) {}
}

export class VideoCreationError implements Action
{
    readonly type = VIDEO_CREATION_ERROR;

    constructor(public errors: Object) {}
}

export class LoadVideoListFromBoundsStart implements Action
{
    readonly type = LOAD_VIDEO_LIST_FROM_BOUNDS_START;
    constructor(public bounds: MapBounds) {}
}

export class LoadVideoListFromBoundsSuccess implements Action
{
    readonly type = LOAD_VIDEO_LIST_FROM_BOUNDS_SUCCESS;
    constructor(public videos: Array<Video>) {}
}

export class LoadVideoListFromBoundsError implements Action
{
    readonly type = LOAD_VIDEO_LIST_FROM_BOUNDS_ERROR;
    constructor(public errors: Array<string>) {}
}

export type VideoActions = VideoCreationStart
                          | VideoCreationSuccess
                          | VideoCreationError
                          | LoadVideoListFromBoundsStart
                          | LoadVideoListFromBoundsSuccess
                          | LoadVideoListFromBoundsError;
