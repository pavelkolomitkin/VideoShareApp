import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-video-management-form',
  templateUrl: './video-management-form.component.html',
  styleUrls: ['./video-management-form.component.css']
})
export class VideoManagementFormComponent implements OnInit {

    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy H:mm',
        defaultOpen: false
    };

  @Input() video: Video = {

  };

  @Input() validationErrors: Object;

  @Output('onSubmit') onSubmitEvent: EventEmitter<Video> = new EventEmitter<Video>();

  constructor() {
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm)
  {
    this.onSubmitEvent.emit(form.value);
  }
}
