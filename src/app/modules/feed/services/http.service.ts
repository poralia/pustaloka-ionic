import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HTTPEnpoint } from '../feed.enum';
import { ICreateActivity, IFilter } from '../feed.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Load activities
   */
  loadActivities(filter: IFilter): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in filter) {
      let value = filter[key as keyof IFilter];

      if ((value && value != undefined) && (key != 'next')) {
        if (Array.isArray(value)) {
          for (let v of value) {
            httpParams = httpParams.append(key + '[]', v);
          }
        } else {
          httpParams = httpParams.append(key, value);
        }
      }
    }
    
    return this.httpClient.get(HTTPEnpoint.ACTIVITY, { params: httpParams });
  }

  /**
   * Retrieve activity
   */
  retrieveActivity(pid: number) {
    return this.httpClient
      .get(`${HTTPEnpoint.ACTIVITY}/${pid}`)
      .pipe(
        map((items: any) => items[0])
      );
  }

  /**
   * Post activity
   */
  postActivity(data: ICreateActivity): Observable<any> {
    return this.httpClient.post(HTTPEnpoint.ACTIVITY, data);
  }

}
