import {GetPopularTagResponseInterface} from './getPopularTagResponse.interface';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetPopularTagResponseInterface | null;
}
