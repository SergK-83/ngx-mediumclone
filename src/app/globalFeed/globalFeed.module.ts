import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalFeedComponent} from './components/globalFeed.component';
import {RouterModule, Routes} from '@angular/router';
import {FeedModule} from '../shared/modules/feed/feed.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    ErrorMessageModule
  ],
  declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule {}
