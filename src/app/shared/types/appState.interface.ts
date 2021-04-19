import {AuthStateInterface} from 'src/app/shared/types/authState.interface';
import {FeedStateInterface} from '../modules/feed/types/feedState.interface';

// Данный интерфейс будет нам показывать все состояние приложения
export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
}
