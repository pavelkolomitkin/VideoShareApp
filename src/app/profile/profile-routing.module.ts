import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommonGuard} from '../routing-guards/common.guard';
import {VideoListComponent} from './video-list/video-list.component';

const routes: Routes = [
    {
        path: 'profile', redirectTo: 'profile/videos'
    },
    {
        path: 'profile',
        canActivateChild: [CommonGuard],
        children: [
            { path: 'videos', component: VideoListComponent}
        ]
    }
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
export class ProfileRoutingModule {}
