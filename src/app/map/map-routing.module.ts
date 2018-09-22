import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommonGuard} from '../routing-guards/common.guard';
import {MapPageComponent} from './map-page/map-page.component';

const routes: Routes = [
     {path: '', component: MapPageComponent, canActivate: [CommonGuard]}
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