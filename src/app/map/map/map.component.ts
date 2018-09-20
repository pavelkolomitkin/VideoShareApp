import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {MapBounds} from '../../models/map-bounds.model';

declare var ymaps:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  //public map: any;

  @Input() center: GeoLocation;

  @Output('onCoordinateSelected') coordinateSelected: EventEmitter<GeoLocation> = new EventEmitter<GeoLocation>();

  @Output('onBoundsChanged') onBoundsChanged: EventEmitter<MapBounds> = new EventEmitter<MapBounds>();

  lastMapBounds: MapBounds = null;

  constructor() {

  }

  onMapCoordinateSelected(event)
  {
      const coords = event.get('coords');
      this.coordinateSelected.emit({longitude: coords[0], latitude: coords[1]});
  }

  onMapBoundChanged(event)
  {
      const data = event.originalEvent.newBounds;

      this.lastMapBounds = this.convertBounds(data);
      this.onBoundsChanged.emit(this.lastMapBounds);
  }

  convertBounds(mapBounds): MapBounds
  {
      return {
          topLeft: { latitude: mapBounds[0][0], longitude: mapBounds[0][1] },
          bottomRight: { latitude: mapBounds[1][0], longitude: mapBounds[1][1] }
      };
  }

  ngOnInit() {

      ymaps.ready().then(() => {
          const map = new ymaps.Map('map', {
              center: [this.center.longitude, this.center.latitude],
              zoom: 5
          });

          map.events.add('click', this.onMapCoordinateSelected, this);
          map.events.add('boundschange', this.onMapBoundChanged, this);

          this.lastMapBounds = this.convertBounds(map.getBounds());
          this.onBoundsChanged.emit(this.lastMapBounds);
      });

  }

}
