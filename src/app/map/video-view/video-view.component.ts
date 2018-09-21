import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Video} from '../../models/video.model';
import {Store, select} from '@ngrx/store';
import {State} from '../../reducers';
import {Subscription} from 'rxjs/Subscription';
import {LoadVideoStart} from '../../actions/video';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input()
  videoId: string;

  video: Video;

  iFrameSafeHtml;

  loadedVideoSubscription: Subscription;

  constructor(private store: Store<State>, private sanitizer: DomSanitizer, private elementRef: ElementRef) {
    this.loadedVideoSubscription = this.store.pipe(select(state => state.video.loadedVideo))
        .subscribe((video) => {
              this.video = video;
              if (this.video !== null)
              {
                  this.iFrameSafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.video.videoData.html);
              }
            },
            (error) => {
                console.error(error);
            });
  }

  ngOnInit() {
      this.store.dispatch(new LoadVideoStart(this.videoId));
  }

  ngOnDestroy(): void {
    this.loadedVideoSubscription.unsubscribe();
  }

    ngAfterViewChecked(): void {

      const videoIframe = this.elementRef.nativeElement.querySelector('iframe');
      if (videoIframe)
      {
          videoIframe.width = "100%";
          videoIframe.height = "100%";
      }

    }

}
