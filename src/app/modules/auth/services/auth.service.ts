import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../state/reducers/auth/auth.reducer';
import { IFilterMember, IFriendFilter, IFriendshipRequest, ILogin, IRegister, IResetPassword, IUpdateProfile } from '../interfaces';
import { AuthActions } from '../state/actions/auth/auth.actions';
import { Preferences } from '@capacitor/preferences';
import * as AuthSelectors from '../state/selectors/auth/auth.selectors';
import { filter, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<AuthState>,
  ) { }

  /**
   * Login
   * 
   * @data ILogin
   * @return void
   */
  login(data: ILogin): void {
    this.store.dispatch(AuthActions.login({ credentials: data }));
  }

  /**
   * Loout
   * 
   * @return void
   */
  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  /**
   * Register
   * 
   * @data ILogin
   * @return void
   */
  register(data: IRegister): void {
    this.store.dispatch(AuthActions.register({ payload: data }));
  }

  /**
   * Resend activation
   * 
   * @email string
   * @return void
   */
  resendActivation(email: string): void {
    this.store.dispatch(AuthActions.resendActivation({ email: email }));
  }

  /**
   * Activate
   * 
   * @code string
   * @email string
   * @return void
   */
  activate(code: string, email: string): void {
    this.store.dispatch(AuthActions.activate({ code: code, email: email }));
  }

  /**
   * Forgot password
   * 
   * @email string
   * @return void
   */
  forgotPassword(email: string): void {
    this.store.dispatch(AuthActions.forgotPassword({ email: email }));
  }

  /**
   * Reset password
   * 
   * @data IResetPassword
   * @return void
   */
  resetPassword(data: IResetPassword): void {
    this.store.dispatch(AuthActions.resetPassword({ payload: data }));
  }

  /**
   * Save auth after login success
   * 
   * @payload auth
   */
  async saveAuth(auth: any) {
    await Preferences.set({
      key: 'auth',
      value: JSON.stringify(auth),
    });
  }

  /**
   * Get auth data
   * 
   * @return auth
   */
  async getAuth() {
    const { value } = await Preferences.get({ key: 'auth' });
    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  /**
   * Check is authenticated
   */
  async isAuthenticated() {
    const auth = await this.getAuth();

    if (auth && auth.token) {
      return true;
    }

    return false;
  }

  /**
   * Retrieve me
   */
  retrieveMe() {
    this.store.dispatch(AuthActions.retrieveMe({ uid: 'me' }));
  }

  /**
   * Select me
   */
  selectMe(): Observable<any> {
    return this.store.pipe(select(AuthSelectors.me));
  }

  /**
   * Get members
   */
  getMembers(filter: IFilterMember, extra?: any): void {
    this.store.dispatch(AuthActions.getMembers({ filter: filter, extra: extra }));
  }

  /**
   * Select members
   */
  selectMembers(): Observable<any> {
    return this.store.pipe(select(AuthSelectors.members));
  }

  /**
   * Retrieve member
   */
  retrieveMember(uid: string) {
    this.store.dispatch(AuthActions.retrieveMember({ uid: uid }));
  }

  /**
   * Select member
   */
  selectMember(): Observable<any> {
    return this.store.pipe(select(AuthSelectors.member));
  }

  /**
   * Update profile
   */
  updateProfile(uid: string, data: IUpdateProfile) {
    this.store.dispatch(AuthActions.updateProfile({ uid: uid, data: data }));
  }

  /**
   * Upload avatar
   */
  uploadAvatar(uid: any, file: File) {
    this.store.dispatch(AuthActions.uploadAvatar({ uid: uid, file: file }));
  }

  /**
   * Friendship request
   */
  friendshipRequest(data: IFriendshipRequest) {
    this.store.dispatch(AuthActions.friendshipRequest({ data: data }));
  }

  /**
   * Get friends
   */
  getFriends(filter: IFriendFilter): void {
    this.store.dispatch(AuthActions.getFriends({ filter: filter }));
  }

  /**
   * Select friends
   */
  selectFriends(): Observable<any> {
    return this.store.pipe(select(AuthSelectors.friends));
  }

  /**
   * Accept friendship
   */
  acceptFriendship(id: string | number) {
    this.store.dispatch(AuthActions.acceptFriendship({ id: id }));
  }

}
