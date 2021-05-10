import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {GetPopularTagResponseInterface} from '../types/getPopularTagResponse.interface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<GetPopularTagResponseInterface> {
    const fullUrl = `${environment.apiUrl}/tags`;

    return this.http.get<GetPopularTagResponseInterface>(fullUrl);
  }
}
