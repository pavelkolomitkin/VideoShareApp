import {GeoLocation} from './geo-location.model';

export interface MapBounds {
    topLeft: GeoLocation;
    bottomRight: GeoLocation;
}