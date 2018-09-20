import * as actions from '../actions/video';
import {Video} from '../models/video.model';
import {MapBounds} from '../models/map-bounds.model';

export interface State {
    newVideo: Video;
    createdVideo: Video;
    creationVideoErrors: Object;
    selectedMapBounds: MapBounds;
    loadedBoundsVideos: Array<Video>;
    loadBoundVideosErrors: Array<string>;
}

const initialState: State = {
    newVideo: null,
    createdVideo: null,
    creationVideoErrors: {},
    selectedMapBounds: null,
    loadedBoundsVideos: [],
    loadBoundVideosErrors: []
};

export function reducer(state = initialState, action: actions.VideoActions): State {
    switch (action.type) {

        case actions.VIDEO_CREATION_START:

            return { ...state, newVideo: action.video, createdVideo: null };

        case actions.VIDEO_CREATION_SUCCESS:

            return { ...state, createdVideo: action.video };

        case actions.VIDEO_CREATION_ERROR:

            return { ...state, creationVideoErrors: action.errors, createdVideo: null };

        case actions.LOAD_VIDEO_LIST_FROM_BOUNDS_START:

            return { ...state, selectedMapBounds: action.bounds };

        case actions.LOAD_VIDEO_LIST_FROM_BOUNDS_SUCCESS:

            return { ...state, loadedBoundsVideos: action.videos };

        case actions.LOAD_VIDEO_LIST_FROM_BOUNDS_ERROR:

            return { ...state, loadBoundVideosErrors: action.errors};

        default:

            return state;
    }
}
