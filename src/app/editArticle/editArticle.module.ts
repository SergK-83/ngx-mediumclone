import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ArticleFormModule} from 'src/app/shared/modules/articleForm/articleForm.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {EditArticleComponent} from 'src/app/editArticle/components/editArticle/editArticle.component';
import {EditArticleService} from 'src/app/editArticle/services/editArticle.service';
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service';
import {GetArticleEffect} from 'src/app/editArticle/store/effects/getArticle.effect';
import {UpdateArticleEffect} from 'src/app/editArticle/store/effects/updateArticle.effect';
import {reducers} from 'src/app/editArticle/store/reducers';
import {LoadingModule} from 'src/app/shared/modules/loading/loading.module';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
