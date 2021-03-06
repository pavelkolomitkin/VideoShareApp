import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Video} from '../../models/video.model';
import {GeoLocation} from '../../models/geo-location.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers/index';
import {VideoCreationStart} from '../../actions/video';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-create-video-form',
  templateUrl: './create-video-form.component.html',
  styleUrls: ['./create-video-form.component.css']
})
export class CreateVideoFormComponent implements OnInit {
    ngOnInit(): void {
        console.log('CreateVideoFormComponent->ngOnInit()');
    }

    video: Video = {
        title: '',
        description: '',
        url: '',
        time: new Date()
    };

    videoErrors: Object = {};

    get selectedLocation()
    {
        return this.video.location;
    }

    @Input() set selectedLocation(value: GeoLocation)
    {
        this.video = { ...this.video, location: value };
    }

  constructor(private store: Store<State>) {
      this.videoErrors = store.pipe(select( state => state.video.creationVideoErrors ));
  }



    onSubmitHandler($event)
    {
        this.store.dispatch(new VideoCreationStart(this.video));
    }


}
