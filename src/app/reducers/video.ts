import * as actions from '../actions/video';
import {Video} from '../models/video.model';

export interface State {
    newVideo: Video;
    creationVideoErrors: Object;
}

const initialState: State = {
    newVideo: null,
    creationVideoErrors: {}
};

export function reducer(state = initialState, action: actions.VideoActions): State {
    switch (action.type) {

        case actions.VIDEO_CREATION_START:

            return { ...state, newVideo: action.video };

        case actions.VIDEO_CREATION_SUCCESS:

            return { ...state, newVideo: action.video };

        case actions.VIDEO_CREATION_ERROR:

            return { ...state, creationVideoErrors: action.errors };

        default:

            return state;
    }
}
