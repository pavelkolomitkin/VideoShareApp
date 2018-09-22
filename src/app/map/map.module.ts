import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import {RouterModule} from '@angular/router';
import {MapRoutingModule} from './map-routing.module';
import { MapPageComponent } from './map-page/map-page.component';
import { ControlsComponent } from './controls/controls.component';
import {CreateVideoFormComponent} from './create-video-form/create-video-form.component';
import {VideoManagementFormComponent} from './video-management-form/video-management-form.component';
import {FormsModule} from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import {FormFieldErrorListComponent} from '../common/form-field-error-list/form-field-error-list.component';
import { VideoViewComponent } from './video-view/video-view.component';


@NgModule({
  declarations: [
    MapComponent,
    MapPageComponent,
    ControlsComponent,
      CreateVideoFormComponent,
      VideoManagementFormComponent,
      FormFieldErrorListComponent,
      VideoViewComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
      AngularDateTimePickerModule,
      MapRoutingModule
  ],
  exports: [
      RouterModule
  ],
    entryComponents: [CreateVideoFormComponent, VideoViewComponent]
})
export class MapModule { }
