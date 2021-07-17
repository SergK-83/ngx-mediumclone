import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './store/reducers';
import {RouterModule, Routes} from '@angular/router';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {ArticleComponent} from './components/article/article.component';
import {TagListModule} from '../shared/modules/tagList/tagList.module';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffect]),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule
  ],
  declarations: [ArticleComponent],
  exports: [],
  providers: [SharedArticleService]
})
export class ArticleModule {}
