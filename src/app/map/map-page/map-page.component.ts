import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {Video} from '../../models/video.model';
import {VideoCreationStart} from '../../actions/video';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Subscription} from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit, OnDestroy {

    @ViewChild('createVideoModal') createVideoModalWindow;
    @ViewChild('createVideoForm') createVideoForm;

  mapCenter: GeoLocation = {longitude: 55.781071, latitude: 37.569699};

  isVideoAdding: boolean = false;

  lastCreatedVideo: Video;

  creationVideoSubscription: Subscription;

  constructor(private store: Store<State>) {

    this.creationVideoSubscription = this.store.pipe(select(state => state.video.newVideo)).subscribe(
        (result: Video) => {
            if (this.lastCreatedVideo !== result)
            {
                this.lastCreatedVideo = result;
                if (this.createVideoModalWindow)
                {
                    this.createVideoModalWindow.hideWindow();
                }
            }
        }
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.creationVideoSubscription.unsubscribe();
  }

    onAddVideoChangeStateHandler($event)
    {
      this.isVideoAdding = $event;
    }

    onNewCoordinateSelected($event: GeoLocation)
    {

      if (this.isVideoAdding) {
          this.createVideoForm.setLocation($event);
          this.createVideoModalWindow.showWindow();
      }
    }
}
