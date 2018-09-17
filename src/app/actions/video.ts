import {Action} from '@ngrx/store';
import {Video} from '../models/video.model';

export const VIDEO_CREATION_START = 'VIDEO_CREATION_START';
export const VIDEO_CREATION_SUCCESS = 'VIDEO_CREATION_SUCCESS';
export const VIDEO_CREATION_ERROR = 'VIDEO_CREATION_ERROR';

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

export type VideoActions = VideoCreationStart
                          | VideoCreationSuccess
                          | VideoCreationError;
