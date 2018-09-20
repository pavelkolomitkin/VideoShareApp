import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {Video} from '../../models/video.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MapBounds} from '../../models/map-bounds.model';
import {LoadVideoListFromBoundsStart} from '../../actions/video';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponent implements OnInit, OnDestroy {

  @ViewChild('createVideoModal') createVideoModalElement: TemplateRef<any>;
  @ViewChild('mapComponent') map;

  createModalReference: NgbModalRef = null;

  lastSelectedLocation: GeoLocation;

  mapCenter: GeoLocation = {longitude: 55.781071, latitude: 37.569699};

  isVideoAdding: boolean = false;

  loadedVideoList: Array<Video> = [];

  creationVideoSubscription: Subscription;
  selectedBoundsSubscription: Subscription;
  loadedBoundsVideoList: Subscription;

  constructor(
      private store: Store<State>,
      private modalService: NgbModal
      ) {

    this.creationVideoSubscription = this.store.pipe(select(state => state.video.createdVideo)).subscribe(
        (result: Video) => {
            if (result !== null) {
                this.closeCreationVideoWindow();
            }
        }
    );

    this.selectedBoundsSubscription = this.store.pipe(select(state => state.video.selectedMapBounds))
        .subscribe((bounds: MapBounds) => {
            console.log('New bounds selected: ', bounds);
        });


    this.loadedBoundsVideoList = this.store.pipe(select(state => state.video.loadedBoundsVideos))
        .subscribe((list: Array<Video>) => {
            console.log('Video list loaded: ', list);
            if (this.map) {
                this.map.setVideos(list);
            }
        });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.creationVideoSubscription.unsubscribe();
    this.selectedBoundsSubscription.unsubscribe();
    this.loadedBoundsVideoList.unsubscribe();
  }

    onAddVideoChangeStateHandler($event)
    {
      this.isVideoAdding = $event;
    }

    onNewCoordinateSelected($event: GeoLocation)
    {
      if (this.isVideoAdding) {
          this.lastSelectedLocation = {...$event};
          this.openCreationVideoWindow();
      }
    }

    onMapBoundChangedHandler(bounds: MapBounds)
    {
        this.store.dispatch(new LoadVideoListFromBoundsStart(bounds));
    }

    onMapVideoSelectedHandler(video: Video)
    {
        console.log('Video selected: ', video);
    }

    openCreationVideoWindow()
    {
        this.createModalReference = this.modalService.open(this.createVideoModalElement, {size: 'lg'});
        this.createModalReference.result
            .then((result) => {
                    this.createModalReference = null;
                    },
            (reason) => {
                    this.createModalReference = null;
                    });
    }

    closeCreationVideoWindow()
    {
      if (this.createModalReference !== null)
      {
          this.createModalReference.close();
          this.createModalReference = null;
      }
    }
}
