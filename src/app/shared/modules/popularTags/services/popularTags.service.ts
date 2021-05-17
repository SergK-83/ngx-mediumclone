import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {GetPopularTagResponseInterface} from '../types/getPopularTagResponse.interface';
import {map} from 'rxjs/operators';
import {PopularTagType} from '../../../types/popularTag.type';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const fullUrl = `${environment.apiUrl}/tags`;

    return  this.http.get(fullUrl).pipe(
      map((response: GetPopularTagResponseInterface) => {
        return response.tags;
      })
    );
  }
}
