import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateChallenge, ICreateReading, IPostFilter, ISubmitBook, IUpdateReading } from '../reading-challege.interface';
import { lastValueFrom, Observable } from 'rxjs';
import { HTTPEnpoint } from '../reading-challenge.enum';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  /**
   * Submit book
   */
  submitBook(data: ISubmitBook): Observable<any> {
    return this.httpClient.post(HTTPEnpoint.BOOK, data);
  }

  /**
   * Update book
   */
  updateBook(pid: string | number, data: ISubmitBook): Observable<any> {
    return this.httpClient.put(`${HTTPEnpoint.BOOK}/${pid}`, data);
  }

  /**
   * Delete book
   */
  deleteBook(pid: string | number): Observable<any> {
    return this.httpClient.delete(`${HTTPEnpoint.BOOK}/${pid}`);
  }

  /**
   * Create challenge
   */
  createChallenge(data: ICreateChallenge): Observable<any> {
    return this.httpClient.post(HTTPEnpoint.CHALLENGE, data);
  }

  /**
   * Update challenge
   */
  updateChallenge(pid: string | number, data: ICreateChallenge): Observable<any> {
    return this.httpClient.put(`${HTTPEnpoint.CHALLENGE}/${pid}`, data);
  }

  /**
   * Delete challenge
   */
  deleteChallenge(pid: string | number): Observable<any> {
    return this.httpClient.delete(`${HTTPEnpoint.CHALLENGE}/${pid}`);
  }

  /**
   * Retrieve challenge
   */
  retrieveChallenge(pid: number): Observable<any> {
    return this.httpClient.get(`${HTTPEnpoint.CHALLENGE}/${pid}`);
  }

  /**
   * List challenge
   */
  getChallenges(filter: IPostFilter): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in filter) {
      let value = filter[key as keyof IPostFilter];

      if ((value && value != undefined) && (key != 'next')) {
        
        if (Array.isArray(value)) {
          for (let v of value) {
            httpParams = httpParams.append(key + '[]', v);
          }
        } else if (typeof value == 'object') {
          if (key == 'meta_query') {
            for (let k in value) {
              if (k == 'relation') {
                httpParams = httpParams.append(`meta_query[${k}]`, value[k]);
              } else {
                for (let kv in value[k]) {
                  httpParams = httpParams.append(`meta_query[${k}][${kv}]`, value[k][kv]);
                }
              }
            }
          }
        } else {
          httpParams = httpParams.append(key, value);
        }
      }
    }

    return this.httpClient.get(`${HTTPEnpoint.CHALLENGE}`, { params: httpParams });
  }

  /**
   * Create reading
   */
  createReading(data: ICreateReading): Observable<any> {
    return this.httpClient.post(HTTPEnpoint.READING, data);
  }

  /**
   * Update reading
   */
  updateReading(pid: number, data: IUpdateReading): Observable<any> {
    return this.httpClient.put(`${HTTPEnpoint.READING}/${pid}`, data);
  }

  /**
   * Delete reading
   */
  deleteReading(pid: number): Observable<any> {
    return this.httpClient.delete(`${HTTPEnpoint.READING}/${pid}`);
  }

  /**
   * Retrieve reading
   */
  retrieveReading(pid: number): Observable<any> {
    return this.httpClient.get(`${HTTPEnpoint.READING}/${pid}`);
  }

  /**
   * Get readings
   */
  getReadings(filter: IPostFilter): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in filter) {
      let value = filter[key as keyof IPostFilter];

      if ((value && value != undefined) && (key != 'next')) {
        
        if (Array.isArray(value)) {
          for (let v of value) {
            httpParams = httpParams.append(key + '[]', v);
          }
        } else if (typeof value == 'object') {
          if (key == 'meta_query') {
            for (let k in value) {
              if (k == 'relation') {
                httpParams = httpParams.append(`meta_query[${k}]`, value[k]);
              } else {
                for (let kv in value[k]) {
                  httpParams = httpParams.append(`meta_query[${k}][${kv}]`, value[k][kv]);
                }
              }
            }
          }
        } else {
          httpParams = httpParams.append(key, value);
        }
      }
    }

    return this.httpClient.get(`${HTTPEnpoint.READING}`, { params: httpParams });
  }

  /**
   * Retrieve book
   */
  retrieveBook(pid: number): Observable<any> {
    return this.httpClient.get(`${HTTPEnpoint.BOOK}/${pid}`);
  }

  /**
   * Upload media
   */
  uploadMedia(associatedId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(`${HTTPEnpoint.MEDIA}`, formData);
  }

  /**
   * Get tags
   */
  getTags(filter: IPostFilter): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in filter) {
      let value = filter[key as keyof IPostFilter];

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

    return this.httpClient.get(`${HTTPEnpoint.TAGS}`, { params: httpParams });
  }

}
