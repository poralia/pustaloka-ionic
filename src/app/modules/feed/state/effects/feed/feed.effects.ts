import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedActions } from '../../actions/feed/feed.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { HttpService as ChallengeHttpService } from 'src/app/modules/challenge/services/http.service';
import { ToastController } from '@ionic/angular';



@Injectable()
export class FeedEffects {

  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private challengeHttpService: ChallengeHttpService,
    private toastCtrl: ToastController,
  ) {}

  async presentToast(message: string, color: string = '', duration: number = 5000) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: duration,
      buttons: [
        {
          text: 'Tutup',
        }
      ]
    });

    await toast.present();
  }

  // ...
  // ACTIVITIES LIST
  // ...
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadActivities),
      mergeMap(action => 
        this.httpService.loadActivities(action.filter).pipe(
          map(res => FeedActions.loadActivitiesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.loadActivitiesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadActivitiesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadActivitiesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  loadActivitiesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadActivitiesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // LOAD MORE ACTIVITIES
  // ...
  loadMoreActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreActivities),
      mergeMap(action => 
        this.httpService.loadActivities(action.filter).pipe(
          map(res => FeedActions.loadMoreActivitiesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.loadMoreActivitiesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadMoreActivitiesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreActivitiesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  loadMoreActivitiesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreActivitiesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // OTHER ACTIVITIES LIST
  // ...
  loadOtherActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadOtherActivities),
      mergeMap(action => 
        this.httpService.loadActivities(action.filter).pipe(
          map(res => FeedActions.loadOtherActivitiesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.loadOtherActivitiesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadOtherActivitiesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadOtherActivitiesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  loadOtherActivitiesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadOtherActivitiesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // LOAD MORE OTHER ACTIVITIES
  // ...
  loadMoreOtherActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreOtherActivities),
      mergeMap(action => 
        this.httpService.loadActivities(action.filter).pipe(
          map(res => FeedActions.loadMoreOtherActivitiesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.loadMoreOtherActivitiesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadMoreOtherActivitiesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreOtherActivitiesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  loadMoreOtherActivitiesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreOtherActivitiesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE ACTIVITY
  // ...
  retrieveActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.retrieveActivity),
      mergeMap(action => 
        this.httpService.retrieveActivity(action.pid).pipe(
          map(res => FeedActions.retrieveActivitySuccess({ data: res, pid: action.pid })),
          catchError(error => of(FeedActions.retrieveActivityFailure({ error: error, pid: action.pid }))),
        )
      )
    )
  )

  retrieveActivitySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.retrieveActivitySuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  retrieveActivityFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.retrieveActivityFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET READING HISTORIES
  // ...
  getReadingHistories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.getReadingHistories),
      mergeMap(action => 
        this.challengeHttpService.getReadings(action.filter).pipe(
          map(res => FeedActions.getReadingHistoriesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.getReadingHistoriesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getReadingHistoriesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.getReadingHistoriesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  getReadingHistoriesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.getReadingHistoriesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET COMMENTS
  // ...
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadComments),
      mergeMap(action => 
        this.httpService.loadActivities(action.filter).pipe(
          map(res => FeedActions.loadCommentsSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.loadCommentsFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadCommentsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadCommentsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  loadCommentsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadCommentsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // LOAD MORE COMMENTS
  // ...
  loadMoreComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreComments),
      mergeMap(action => 
        this.httpService.loadActivities(action.filter).pipe(
          map(res => FeedActions.loadMoreCommentsSuccess({ data: res, filter: action.filter })),
          catchError(error => of(FeedActions.loadMoreCommentsFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadMoreCommentsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreCommentsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )

  loadMoreCommentsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadMoreCommentsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // POST COMMENT
  // ...
  postComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.postComment),
      mergeMap(action => 
        this.httpService.postActivity(action.data).pipe(
          map(res => FeedActions.postCommentSuccess({ data: res })),
          catchError(error => of(FeedActions.postCommentFailure({ error: error }))),
        )
      )
    )
  )

  postCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.postCommentSuccess),
      tap(({ data }) => {
        console.log(data);
        this.presentToast('Komentar terkirim', 'success', 1500);
      }),
    ), { dispatch: false }
  )

  postCommentFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.postCommentFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // MARK ACTIVITY FAVORITE
  // ...
  markFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.markFavorite),
      mergeMap(action => 
        this.httpService.favorite(action.pid).pipe(
          map(res => FeedActions.markFavoriteSuccess({ data: res, pid: action.pid })),
          catchError(error => of(FeedActions.markFavoriteFailure({ error: error, pid: action.pid }))),
        )
      )
    )
  )

  markFavoriteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.markFavoriteSuccess),
      tap(({ data }) => {
        console.log(data);
        this.presentToast('Berhasil difavoritkan', 'success', 1500);
      }),
    ), { dispatch: false }
  )

  markFavoriteFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.markFavoriteFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )

}
