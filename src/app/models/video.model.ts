import {User} from './user.model';
import {GeoLocation} from './geo-location.model';

export interface Video {
    _id?: string;
    url?: string;
    title?: string;
    description?: string;
    time?: Date;
    location?: GeoLocation;
    owner?: User;
    videoData?: {
        thumbnail_url?: string,
        html?: string
    };
}
