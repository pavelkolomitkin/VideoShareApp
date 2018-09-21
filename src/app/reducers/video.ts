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
    loadingVideoId: string;
    loadedVideo: Video;
    loadedVideoError: string;
}

const initialState: State = {
    newVideo: null,
    createdVideo: null,
    creationVideoErrors: {},
    selectedMapBounds: null,
    loadedBoundsVideos: [],
    loadBoundVideosErrors: [],
    loadingVideoId: null,
    loadedVideo: null,
    loadedVideoError: null
};

export function reducer(state = initialState, action: actions.VideoActions): State {
    switch (action.type) {

        case actions.VIDEO_CREATION_START:

            return { ...state, newVideo: action.video, createdVideo: null, creationVideoErrors: {}};

        case actions.VIDEO_CREATION_SUCCESS:

            return { ...state, createdVideo: action.video, creationVideoErrors: {} };

        case actions.VIDEO_CREATION_ERROR:

            return { ...state, creationVideoErrors: action.errors, createdVideo: null };

        case actions.VIDE0_CREATION_CANCEL:

            return { ...state, newVideo: null, createdVideo: null, creationVideoErrors: {}};

        case actions.LOAD_VIDEO_LIST_FROM_BOUNDS_START:

            return { ...state, selectedMapBounds: action.bounds };

        case actions.LOAD_VIDEO_LIST_FROM_BOUNDS_SUCCESS:

            return { ...state, loadedBoundsVideos: action.videos };

        case actions.LOAD_VIDEO_LIST_FROM_BOUNDS_ERROR:

            return { ...state, loadBoundVideosErrors: action.errors};

        case actions.LOAD_VIDEO_START:

            return { ...state, loadingVideoId: action.id };

        case actions.LOAD_VIDEO_SUCCESS:

            return { ...state, loadedVideo: action.video };

        case actions.LOAD_VIDEO_ERROR:

            return { ...state, loadedVideoError: action.error };

        default:

            return state;
    }
}
