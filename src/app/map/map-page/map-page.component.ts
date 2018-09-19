import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GeoLocation} from '../../models/geo-location.model';
import {Video} from '../../models/video.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponent implements OnInit, OnDestroy {

  @ViewChild('createVideoModal') createVideoModal: TemplateRef<any>;

  modalData: {};

  lastSelectedLocation: GeoLocation;

  mapCenter: GeoLocation = {longitude: 55.781071, latitude: 37.569699};

  isVideoAdding: boolean = false;

  creationVideoSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private modalService: NgbModal
      ) {

    this.creationVideoSubscription = this.store.pipe(select(state => state.video.newVideo)).subscribe(
        (result: Video) => {
            console.log(result);
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
          console.log('------------------');
          this.lastSelectedLocation = {...$event};
          this.openCreationVideoWindow();
          console.log('');
      }
    }

    openCreationVideoWindow()
    {
        this.modalData = {location: {...this.lastSelectedLocation}};
        console.log(this.modalData);

        this.modalService.open(this.createVideoModal, {size: 'lg'});
        /*
        this
            .modalService
            .open(this.createVideoModal)
            .result
            .then((result) => {
                //this.closeResult = `Closed with: ${result}`;
                debugger
                console.log(result);
            }, (reason) => {
                debugger
                console.error(reason);
                //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });*/
    }
}
