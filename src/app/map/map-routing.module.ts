import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map/map.component';
import {CommonGuard} from '../routing-guards/common.guard';

const routes: Routes = [
     {path: 'map', component: MapComponent, canActivate: [CommonGuard]}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [CommonGuard]
})
export class MapRoutingModule {}