import {AuthStateInterface} from 'src/app/shared/types/authState.interface';
import {FeedStateInterface} from '../modules/feed/types/feedState.interface';
import {PopularTagsStateInterface} from '../modules/popularTags/types/popularTagsState.interface';
import {ArticleInterface} from './article.interface';
import {CreateArticleStateInterface} from 'src/app/createArticle/types/createArticleState.interface';
import {EditArticleStateInterface} from 'src/app/editArticle/types/editArticleState.interface';
import {SettingsStateInterface} from 'src/app/settings/types/settingsState.interface';
import {UserProfileStateInterface} from 'src/app/userProfile/types/userProfileState.interface';

// Данный интерфейс будет нам показывать все состояние приложения
export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
  userProfile: UserProfileStateInterface;
}
