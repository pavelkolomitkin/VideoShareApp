import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';

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

  constructor() {

  }

  onCoordinateSelected(event)
  {
      const coords = event.get('coords');
      this.coordinateSelected.emit({longitude: coords[0], latitude: coords[1]});
  }

  ngOnInit() {

      ymaps.ready().then(() => {
          const map = new ymaps.Map('map', {
              center: [this.center.longitude, this.center.latitude],
              zoom: 5
          });

          map.events.add('click', this.onCoordinateSelected, this);
      });

  }

}
