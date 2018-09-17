import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Video } from '../../models/video.model';
import {Observable} from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-video-management-form',
  templateUrl: './video-management-form.component.html',
  styleUrls: ['./video-management-form.component.css']
})
export class VideoManagementFormComponent implements OnInit {

  @Input() video: Video;

  @Input() validationErrors: Observable<Object>;

  @ViewChild('datetimePicker') timePicker: ElementRef;

  @Output('onSubmit') onSubmitEvent: EventEmitter<Video> = new EventEmitter<Video>();

  constructor() {
  }

  ngOnInit() {
      $(this.timePicker.nativeElement).datetimepicker({ format: 'HH:MM yyyy-dd-mm' });
  }

  onSubmit(form: NgForm)
  {
      this.onSubmitEvent.emit(this.video);
  }
}
