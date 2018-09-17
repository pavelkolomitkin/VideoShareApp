import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Video} from '../../models/video.model';
import {GeoLocation} from '../../models/geo-location.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {VideoCreationStart} from '../../actions/video';

@Component({
  selector: 'app-create-video-form',
  templateUrl: './create-video-form.component.html',
  styleUrls: ['./create-video-form.component.css']
})
export class CreateVideoFormComponent implements OnInit {

  video: Video = {
      location: {}
  };


  videoErrors: Object = {};

  constructor(private store: Store<State>) {
      this.videoErrors = store.pipe(select( state => state.video.creationVideoErrors ));
  }

  public setLocation(location: GeoLocation)
  {
      debugger
      this.video.location = location;
  }


  ngOnInit() {
  }

    onSubmitHandler($event)
    {
        this.store.dispatch(new VideoCreationStart(this.video));
    }

}
