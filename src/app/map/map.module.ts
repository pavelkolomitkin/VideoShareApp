import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import {RouterModule} from '@angular/router';
import {MapRoutingModule} from './map-routing.module';
import { MapPageComponent } from './map-page/map-page.component';
import { ControlsComponent } from './controls/controls.component';
import {ModalWindowComponent} from '../common/modal-window/modal-window.component';
import {CreateVideoFormComponent} from '../common/create-video-form/create-video-form.component';
import {VideoManagementFormComponent} from '../common/video-management-form/video-management-form.component';
import {FormsModule} from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';


@NgModule({
  declarations: [
    MapComponent,
    MapPageComponent,
    ControlsComponent,
      ModalWindowComponent,
      CreateVideoFormComponent,
      VideoManagementFormComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
      AngularDateTimePickerModule
  ],
  exports: [
      RouterModule
  ]
})
export class MapModule { }
