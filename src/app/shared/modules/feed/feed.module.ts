import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './components/feed.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GetFeedEffect} from './store/effects/getFeed.effect';
import {reducers} from './store/reducers';
import {FeedService} from './services/feed.service';
import {RouterModule} from '@angular/router';
import {UserAvatarDefaultDirective} from '../../directives/user-avatar-default.directive';
import {ErrorMessageModule} from '../errorMessage/errorMessage.module';
import {LoadingModule} from '../loading/loading.module';
import {PaginationModule} from '../pagination/pagination.module';
import {TagListModule} from '../tagList/tagList.module';
import {AddToFavoritesModule} from 'src/app/shared/modules/addToFavorites/addToFavorites.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('feed', reducers),
    EffectsModule.forFeature([GetFeedEffect]),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule
  ],
  declarations: [FeedComponent, UserAvatarDefaultDirective],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}
