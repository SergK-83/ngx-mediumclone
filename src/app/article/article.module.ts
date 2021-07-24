import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from 'src/app/article/store/reducers';
import {RouterModule, Routes} from '@angular/router';
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service';
import {ArticleService} from 'src/app/article/services/article.service';
import {TagListModule} from 'src/app/shared/modules/tagList/tagList.module';
import {ArticleComponent} from 'src/app/article/components/article/article.component';
import {LoadingModule} from 'src/app/shared/modules/loading/loading.module';
import {ErrorMessageModule} from 'src/app/shared/modules/errorMessage/errorMessage.module';
import {GetArticleEffect} from 'src/app/article/store/effects/getArticle.effect';
import {DeleteArticleEffect} from 'src/app/article/store/effects/deleteArticle.effect';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule,
  ],
  declarations: [ArticleComponent],
  exports: [],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
