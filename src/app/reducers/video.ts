import * as actions from '../actions/video';
import {Video} from '../models/video.model';

export interface State {
    newVideo: Video;
    createdVideo: Video;
    creationVideoErrors: Object;
}

const initialState: State = {
    newVideo: null,
    createdVideo: null,
    creationVideoErrors: {}
};

export function reducer(state = initialState, action: actions.VideoActions): State {
    switch (action.type) {

        case actions.VIDEO_CREATION_START:

            return { ...state, newVideo: action.video, createdVideo: null };

        case actions.VIDEO_CREATION_SUCCESS:

            return { ...state, createdVideo: action.video };

        case actions.VIDEO_CREATION_ERROR:

            return { ...state, creationVideoErrors: action.errors, createdVideo: null };

        default:

            return state;
    }
}
