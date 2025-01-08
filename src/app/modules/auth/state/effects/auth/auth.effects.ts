import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../../actions/auth/auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../../interfaces';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private router: Router,
  ) {}

  // Toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      color: color,
      buttons: [
        {
          text: 'Tutup',
        }
      ]
    });

    await toast.present();
  }

  // ...
  // LOGIN
  // ...
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action => 
        this.httpService.login(action.credentials).pipe(
          map(res => AuthActions.loginSuccess({ data: res })),
          catchError(error => of(AuthActions.loginFailure({ error: error }))),
        )
      )
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ data }) => {
        console.log(data);
        this.authService.saveAuth(data);
        this.router.navigate(['/tabs/feed'], { replaceUrl: true });
        this.authService.retrieveMe();
      })
    ), { dispatch: false }
  )

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);
      })
    ), { dispatch: false }
  )


  // ...
  // LOGOUT
  // ...
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    exhaustMap(() => {
      return this.httpService.logout().then(() => {
        return AuthActions.logoutSuccess();
      });
    })
  ));

  logoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logoutSuccess),
    tap(() => {
      console.log('Logout success');
      this.router.navigate(['/welcome']);
    })
  ), { dispatch: false });


  // ...
  // REGISTER
  // ...
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(action => 
        this.httpService.register(action.payload).pipe(
          map(res => AuthActions.registerSuccess({ data: res, payload: action.payload })),
          catchError(error => of(AuthActions.registerFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(({ data, payload }) => {
        console.log(data);

        const signup    = data[0];
        const isActive  = signup?.is_active;
        const status    = signup?.status;
        
        if ( isActive || status === 'registered' ) {
          // indicated login with google
          const loginData: ILogin = {
            username: payload.user_email,
            password: payload.password,
          }

          this.authService.login(loginData);
        } else {
          // redirect to activation page
          this.router.navigate(['/auth/activation'], { 
            replaceUrl: true,
            queryParams: {
              user_email: signup?.user_email,
            } 
          });
        }
      })
    ), { dispatch: false }
  )

  registerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerFailure),
      tap(({ error, payload }) => {
        console.log(error);
        const message = error.error.message;
        const data = error.error?.data;
        if (data) {
          const code = data?.code;
          if (code === 'user_name') {
            // do resend validation email
            const userEmail = payload?.user_email;
            this.authService.resendActivation(userEmail);
          }
          else {
            this.presentToast(message);
          }
        }
      })
    ), { dispatch: false }
  )


  // ...
  // RESEND ACTIVATION
  // ...
  resendActivation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendActivation),
      exhaustMap(action => 
        this.httpService.resendActivation(action.email).pipe(
          map(res => AuthActions.resendActivationSuccess({ data: res, email: action.email })),
          catchError(error => of(AuthActions.resendActivationFailure({ error: error, email: action.email }))),
        )
      )
    )
  )

  resendActivationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendActivationSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router.navigate(['/auth/activation'], { 
          replaceUrl: true,
          queryParams: {
            user_email: data?.user_email,
          } 
        });
      })
    ), { dispatch: false }
  )

  resendActivationFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendActivationFailure),
      tap(({ error, email }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // ACTIVATE
  // ...
  activate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.activate),
      exhaustMap(action => 
        this.httpService.activate(action.code, action.email).pipe(
          map(res => AuthActions.activateSuccess({ data: res, code: action.code, email: action.email })),
          catchError(error => of(AuthActions.activateFailure({ error: error, code: action.code, email: action.email }))),
        )
      )
    )
  )

  activateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.activateSuccess),
      tap(({ data, code, email }) => {
        console.log(data);
        this.router.navigate(['/auth/login'], { 
          replaceUrl: true,
          queryParams: {
            user_email: email,
          }
        });

        this.presentToast('Aktivasi akun berhasil! Masukkan kata sandi untuk login.', 'success');
      })
    ), { dispatch: false }
  )

  activateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.activateFailure),
      tap(({ error, code }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // FORGOT PASSWORD
  // ...
  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap(action => 
        this.httpService.forgotPassword(action.email).pipe(
          map(res => AuthActions.forgotPasswordSuccess({ data: res, email: action.email })),
          catchError(error => of(AuthActions.forgotPasswordFailure({ error: error, email: action.email }))),
        )
      )
    )
  )

  forgotPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordSuccess),
      tap(({ data, email }) => {
        console.log(data);

        this.modalCtrl.getTop().then(m => {
          if (m) {
            this.modalCtrl.dismiss();
          }
        });

        this.router.navigate(['/auth/reset-password'], { 
          replaceUrl: true,
          queryParams: {
            user_email: email,
          }
        });
      })
    ), { dispatch: false }
  )

  forgotPasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // RESET PASSWORD
  // ...
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap(action => 
        this.httpService.resetPassword(action.payload).pipe(
          map(res => AuthActions.resetPasswordSuccess({ data: res, payload: action.payload })),
          catchError(error => of(AuthActions.resetPasswordFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  resetPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordSuccess),
      tap(({ data, payload }) => {
        console.log(data);

        this.router.navigate(['/auth/login'], { 
          replaceUrl: true,
          queryParams: {
            user_email: payload.user_email,
          }
        }).then(() => {
          this.presentToast(data.message, 'success');
        })
      })
    ), { dispatch: false }
  )

  resetPasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE ME
  // ...
  retrieveMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.retrieveMe),
      exhaustMap(action => 
        this.httpService.retrieveProfile(action.uid).pipe(
          map(res => AuthActions.retrieveMeSuccess({ data: res })),
          catchError(error => of(AuthActions.retrieveMeFailure({ error: error }))),
        )
      )
    )
  )

  retrieveMeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.retrieveMeSuccess),
      tap(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  retrieveMeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.retrieveMeFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // GET MEMBERS
  // ...
  getMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getMembers),
      exhaustMap(action => 
        this.httpService.getMembers(action.filter).pipe(
          map(res => AuthActions.getMembersSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(AuthActions.getMembersFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getMembersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getMembersSuccess),
      tap(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  getMembersFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getMembersFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE MEMBER
  // ...
  retrieveMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.retrieveMember),
      exhaustMap(action => 
        this.httpService.retrieveProfile(action.uid).pipe(
          map(res => AuthActions.retrieveMemberSuccess({ data: res })),
          catchError(error => of(AuthActions.retrieveMemberFailure({ error: error }))),
        )
      )
    )
  )

  retrieveMemberSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.retrieveMemberSuccess),
      tap(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  retrieveMemberFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.retrieveMemberFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // UPDATE PROFILE
  // ...
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      exhaustMap(action => 
        this.httpService.updateProfile(action.uid, action.data).pipe(
          map(res => AuthActions.updateProfileSuccess({ data: res })),
          catchError(error => of(AuthActions.updateProfileFailure({ error: error }))),
        )
      )
    )
  )

  updateProfileSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfileSuccess),
      tap(({ data }) => {
        console.log(data);
        this.presentToast('Profil berhasil diperbarui.', 'success');
        this.router.navigate(['/tabs/feed'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  updateProfileFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfileFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // UPLOAD AVATAR
  // ...
  uploadAvatar$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.uploadAvatar),
    exhaustMap((payload: { file: File, uid: number | string }) => {
      return this.httpService.uploadAvatar(payload.file, payload.uid).pipe(
        map((data: any) => AuthActions.uploadAvatarSuccess({ data: data[0] })),
        catchError((error: any) => of(AuthActions.uploadAvatarFailure({ error: error }))),
      );
    })
  ));

  uploadAvatarSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.uploadAvatarSuccess),
    tap(({ data }) => {
      console.log(data);
    })
  ), { dispatch: false });

  uploadAvatarFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.uploadAvatarFailure),
    map((error: any) => {
      console.log(error);
    })
  ), { dispatch: false });


  // ...
  // FRIENDSHIP REQUEST
  // ...
  friendshipRequest$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.friendshipRequest),
    exhaustMap(action => {
      return this.httpService.friendshipRequest(action.data).pipe(
        map((data: any) => AuthActions.friendshipRequestSuccess({ data: data[0] })),
        catchError((error: any) => of(AuthActions.friendshipRequestFailure({ error: error }))),
      );
    })
  ));

  friendshipRequestSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.friendshipRequestSuccess),
    tap((response: any) => {
      console.log(response);
      this.presentToast('Permintaan pertemanan dikirim', 'success');
    })
  ), { dispatch: false });

  friendshipRequestFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.friendshipRequestFailure),
    tap(({ error }) => {
      console.log(error);
      const message = error.error.message;
      this.presentToast(message);
    })
  ), { dispatch: false });


  // ...
  // GET FRIENDS
  // ...
  getFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getFriends),
      exhaustMap(action => 
        this.httpService.getFriends(action.filter).pipe(
          map(res => AuthActions.getFriendsSuccess({ data: res, filter: action.filter })),
          catchError(error => of(AuthActions.getFriendsFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getFriendsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getFriendsSuccess),
      tap(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  getFriendsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getFriendsFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // ACCEPT FRIENDSHIP
  // ...
  acceptFriendship$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.acceptFriendship),
      exhaustMap(action => 
        this.httpService.acceptFriendship(action.id).pipe(
          map(res => AuthActions.acceptFriendshipSuccess({ data: res, id: action.id })),
          catchError(error => of(AuthActions.acceptFriendshipFailure({ error: error, id: action.id }))),
        )
      )
    )
  )

  acceptFriendshipSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.acceptFriendshipSuccess),
      tap(({ data }) => {
        console.log(data);
        this.presentToast('Berhasil menerima pertemanan', 'success');
      })
    ), { dispatch: false }
  )

  acceptFriendshipFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.acceptFriendshipFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )


  // ...
  // CHECK OAUTH 
  // ...
  checkOAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkOAuth),
      exhaustMap(action => 
        this.httpService.checkOAuth(action.payload).pipe(
          map(res => AuthActions.checkOAuthSuccess({ data: res, payload: action.payload })),
          catchError(error => of(AuthActions.checkOAuthFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  checkOAuthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkOAuthSuccess),
      tap(({ data, payload }) => {
        console.log(data);
        this.authService.saveAuth(data);
        this.router.navigate(['/tabs/feed'], { replaceUrl: true });
        this.authService.retrieveMe();
      })
    ), { dispatch: false }
  )

  checkOAuthFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkOAuthFailure),
      tap(({ error, payload }) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode !== 404) {
          const message = error.error.message;
          this.presentToast(message);
        }
      })
    ), { dispatch: false }
  )


  // ...
  // GET STATS
  // ...
  getStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getStats),
      exhaustMap(action => 
        this.httpService.getStats(action.filter).pipe(
          map(res => AuthActions.getStatsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(AuthActions.getStatsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getStatsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getStatsSuccess),
      tap(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  getStatsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getStatsFailure),
      tap(({ error }) => {
        console.log(error);
        const message = error.error.message;
        this.presentToast(message);

      })
    ), { dispatch: false }
  )

}
