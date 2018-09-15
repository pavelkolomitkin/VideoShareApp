import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import {RouterModule} from '@angular/router';
import {MapRoutingModule} from './map-routing.module';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
      MapRoutingModule
  ],
  exports: [
      RouterModule
  ]
})
export class MapModule { }
