import {AuthStateInterface} from 'src/app/shared/types/authState.interface';
import {FeedStateInterface} from '../modules/feed/types/feedState.interface';
import {PopularTagsStateInterface} from '../modules/popularTags/types/popularTagsState.interface';
import {ArticleInterface} from './article.interface';
import {CreateArticleStateInterface} from 'src/app/createArticle/types/createArticleState.interface';

// Данный интерфейс будет нам показывать все состояние приложения
export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleInterface;
  createArticle: CreateArticleStateInterface;
}
