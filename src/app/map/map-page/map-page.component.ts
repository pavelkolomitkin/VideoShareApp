import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {Video} from '../../models/video.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MapBounds} from '../../models/map-bounds.model';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponent implements OnInit, OnDestroy {

  @ViewChild('createVideoModal') createVideoModalElement: TemplateRef<any>;

  createModalReference: NgbModalRef = null;

  lastSelectedLocation: GeoLocation;

  mapCenter: GeoLocation = {longitude: 55.781071, latitude: 37.569699};

  isVideoAdding: boolean = false;

  creationVideoSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private modalService: NgbModal
      ) {

    this.creationVideoSubscription = this.store.pipe(select(state => state.video.createdVideo)).subscribe(
        (result: Video) => {
            if (result !== null) {
                console.log(result);
                this.closeCreationVideoWindow();
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
          this.lastSelectedLocation = {...$event};
          this.openCreationVideoWindow();
      }
    }

    onMapBoundChangedHandler(bounds: MapBounds)
    {
        console.log('Map bounds changed: ', bounds);
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
