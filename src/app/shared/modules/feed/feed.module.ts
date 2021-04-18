import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './components/feed.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GetFeedEffect} from './store/effects/getFeed.effect';
import {reducers} from './store/reducers';
import {FeedService} from './services/feed.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('feed', reducers),
    EffectsModule.forFeature([GetFeedEffect])
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}
