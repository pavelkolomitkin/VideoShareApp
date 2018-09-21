import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {Video} from '../../models/video.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MapBounds} from '../../models/map-bounds.model';
import {LoadVideoListFromBoundsStart, VideoCreationCancel} from '../../actions/video';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponent implements OnInit, OnDestroy {

  @ViewChild('createVideoModal') createVideoModalElement: TemplateRef<any>;
  @ViewChild('videoViewModal') videoViewModalElement: TemplateRef<any>;
  @ViewChild('mapComponent') map;

  createModalReference: NgbModalRef = null;
  videoViewModalReference: NgbModalRef = null;

  lastSelectedLocation: GeoLocation;

  mapCenter: GeoLocation = {longitude: 55.781071, latitude: 37.569699};

  isVideoAdding: boolean = false;
  loadedVideoList: Array<Video> = [];
  lastSelectedVideo: Video;
  lastMapBounds: MapBounds;

  creationVideoSubscription: Subscription;
  loadedBoundsVideoList: Subscription;

  constructor(
      private store: Store<State>,
      private modalService: NgbModal
      ) {

    this.creationVideoSubscription = this.store.pipe(select(state => state.video.createdVideo)).subscribe(
        (result: Video) => {
            if (result !== null) {
                this.closeCreationVideoWindow();
                this.store.dispatch(new LoadVideoListFromBoundsStart(this.lastMapBounds));
            }
        }
    );

    this.loadedBoundsVideoList = this.store.pipe(select(state => state.video.loadedBoundsVideos))
        .subscribe((list: Array<Video>) => {
            if (this.map) {
                this.map.setVideos(list);
            }
        });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.creationVideoSubscription.unsubscribe();
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
        this.lastMapBounds = bounds;
        this.store.dispatch(new LoadVideoListFromBoundsStart(bounds));
    }

    onMapVideoSelectedHandler(video: Video)
    {
        this.lastSelectedVideo = video;
        this.openVideoViewModalWindow();
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
                    this.store.dispatch(new VideoCreationCancel());
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

    openVideoViewModalWindow()
    {
        this.videoViewModalReference = this.modalService.open(this.videoViewModalElement, {size: 'lg', windowClass: '.video-view-window'});
        this.videoViewModalReference.result
            .then((result) => {
                    this.videoViewModalReference = null;
                },
                (reason) => {
                    this.videoViewModalReference = null;
                });
    }

    closeVideoViewModal()
    {
        if (this.videoViewModalReference !== null)
        {
            this.videoViewModalReference.close();
            this.videoViewModalReference = null;
        }
    }
}
