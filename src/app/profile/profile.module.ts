import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
      ProfileRoutingModule
  ],
  exports: [
      RouterModule
  ],
  declarations: [VideoListComponent]
})
export class ProfileModule { }
