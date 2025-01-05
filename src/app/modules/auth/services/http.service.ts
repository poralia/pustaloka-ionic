import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilterMember, IFriendFilter, IFriendshipRequest, ILogin, IRegister, IResetPassword, IUpdateProfile } from '../interfaces';
import { lastValueFrom, Observable, of } from 'rxjs';
import { HTTPEnpoint } from '../auth.enum';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Login
   * 
   * @data ILogin
   * @return Observable<any>
   */
  login(data: ILogin): Observable<any> {
    return this.httpClient.post<any>(HTTPEnpoint.LOGIN, data);
  }

  /**
   * Register
   * 
   * @data IRegister
   * @return Observable<any>
   */
  register(data: IRegister): Observable<any> {
    return this.httpClient.post<any>(HTTPEnpoint.REGISTER, data);
  }

  /**
   * Resend activation
   * 
   * @email string
   * @return Observable<any>
   */
  resendActivation(email: string): Observable<any> {
    return this.httpClient.post<any>(HTTPEnpoint.RESEND_ACIVATION, { user_email: email });
  }

  /**
   * Activate
   * 
   * @code string
   * @email string
   * @return Observable<any>
   */
  activate(code: string, email: string): Observable<any> {
    return this.httpClient.post<any>(`${HTTPEnpoint.ACTIVATE}/${code}`, { user_email: email });
  }

  /**
   * Forgot passsword
   * 
   * @email string
   * @return Observable<any>
   */
  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${HTTPEnpoint.FORGOT_PASSWORD}`, { user_email: email });
  }

  /**
   * Reset passsword
   * 
   * @data IResetPassword
   * @return Observable<any>
   */
  resetPassword(data: IResetPassword): Observable<any> {
    return this.httpClient.post<any>(`${HTTPEnpoint.RESET_PASSWORD}`, data);
  }

  /**
   * Retrieve profile
   */
  retrieveProfile(uid: string): Observable<any> {
    return this.httpClient.get<any>(`${HTTPEnpoint.MEMBER}/${uid}`);
  }

  /**
   * Update profile
   */
  updateProfile(uid: string, data: IUpdateProfile): Observable<any> {
    return this.httpClient.post<any>(`${HTTPEnpoint.USER}/${uid}`, data);
  }

  /**
   * Get members
   */
  getMembers(filter: IFilterMember): Observable<any> {
    let httpParams = new HttpParams();
    
    for (let key in filter) {
      let value = filter[key as keyof IFilterMember];

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
    
    return this.httpClient.get<any>(`${HTTPEnpoint.MEMBER}`, { params: httpParams });
  }

  /**
   * Upload avatar
   * 
   * @param file The file to upload
   * @returns Observable<unknown>
   */
  public uploadAvatar(file: File, uid: number | string): Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);
    formData.append('action', 'bp_avatar_upload');

    return this.httpClient.post(`buddypress/v1/members/${uid}/avatar`, formData);
  }

  /**
   * Friendship Request
   */
  public friendshipRequest(data: IFriendshipRequest): Observable<any> {
    return this.httpClient.post<any>(`${HTTPEnpoint.FRIENDS}`, data);
  }

  /**
   * Get friends
   */
  public getFriends(filter: IFriendFilter): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in filter) {
      let value = filter[key as keyof IFriendFilter];

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

    return this.httpClient.get<any>(`${HTTPEnpoint.FRIENDS}`, { params: httpParams });
  }

  /**
   * Accept friendship request
   */
  acceptFriendship(id: string | number): Observable<any> {
    return this.httpClient.put<any>(`${HTTPEnpoint.FRIENDS}/${id}`, { id: id });
  }

  /**
   * Logout
   */
  public async logout(): Promise<any> {
    await Preferences.remove({ key: 'auth' });
    console.log('Token removed');

    return lastValueFrom(of(null));
  }

}
