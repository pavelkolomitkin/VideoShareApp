import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {MapBounds} from '../../models/map-bounds.model';
import {Video} from '../../models/video.model';

declare var ymaps:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public map: any;

  @Input() center: GeoLocation;

  @Output('onCoordinateSelected') coordinateSelected: EventEmitter<GeoLocation> = new EventEmitter<GeoLocation>();

  @Output('onBoundsChanged') onBoundsChanged: EventEmitter<MapBounds> = new EventEmitter<MapBounds>();

  @Output('onVideoSelected') onVideoSelected: EventEmitter<Video> = new EventEmitter<Video>();

  lastMapBounds: MapBounds = null;

  _videos: Array<Video> = [];

  private videoMarks = [];

  public setVideos(value: Array<Video>)
  {
      this.updateVideoMarks(value);
  }

  constructor() {

  }

  onMapCoordinateSelected(event)
  {
      const coords = event.get('coords');
      this.coordinateSelected.emit({latitude: coords[0], longitude: coords[1]});
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

          this.map = map;
      });

  }

  private clearVideoMarks()
  {
      for (const mark of this.videoMarks)
      {
          this.map.geoObjects.remove(mark);
      }

      this.videoMarks = [];
      this._videos = [];
  }

  private updateVideoMarks(videos: Array<Video>)
  {
      // clear old video marks
      this.clearVideoMarks();

      // create new video marks
      for (const video of videos)
      {
          const mark = this.createVideoMark(video);
          this.initVideoMarkEvents(mark, video);
          // create mark
          // add link in internal array
          this.videoMarks.push(mark);

          // add mark to map
          this.map.geoObjects.add(mark);
      }

      this._videos = videos;
  }

  private createVideoMark(video: Video)
  {
      const contentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      );

      const result = new ymaps.Placemark([video.location.latitude, video.location.longitude],
          {
              hintContent: video.title,
              balloonContent: '',
              iconContent: ''
          },
          {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: 'default#imageWithContent',
              // Своё изображение иконки метки.
              iconImageHref: video.videoData.thumbnail_url,
              // Размеры метки.
              iconImageSize: [48, 48],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-24, -24],
              // Смещение слоя с содержимым относительно слоя с картинкой.
              iconContentOffset: [15, 15],
              // Макет содержимого.
              iconContentLayout: contentLayout
          });


      return result;
  }

  private initVideoMarkEvents(mark: any, video: Video)
  {
      const self = this;
      mark.events.add('click',
          (() => {
              return () => {
                  self.onVideoSelected.emit(video);
              };
          })()
        );
  }

}
