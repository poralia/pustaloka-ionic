import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReadingChallengeActions } from '../../actions/reading-challenge/reading-challenge.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ChallengeService } from '../../../services/challenge.service';
import { HttpService } from '../../../services/http.service';
import { ICreateChallenge, ICreateReading } from '../../../reading-challege.interface';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/modules/feed/services/feed.service';
import { IFilter } from 'src/app/modules/feed/feed.interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { TZDate } from '@date-fns/tz';



@Injectable()
export class ReadingChallengeEffects {

  constructor(
    private actions$: Actions,
    private challengeService: ChallengeService,
    private feedService: FeedService,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {}

  async loadChallenges() {
    const auth = await this.authService.getAuth();
    if (auth) {
      this.challengeService.getChallenges({ 
        author: auth.user_id,
        meta_query: {
          relation: 'AND',
          0: {
            key: 'status',
            value: 'ongoing',
            compare: '=',
          }
        }
      });
    }
  }

  async presentToast(message: string, color?: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 3000,
      buttons: [
        {
          text: "Tutup",
        }
      ],
    });

    await toast.present();
  }

  async presentAlert(message: string) {
    const alrt = await this.alertCtrl.create({
      message: message,
    });

    await alrt.present();
  }


  // ...
  // SUBMIT BOOK
  // ...
  submitBook$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.submitBook),
      mergeMap(action => 
        this.httpService.submitBook(action.payload).pipe(
          map(res => ReadingChallengeActions.submitBookSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ReadingChallengeActions.submitBookFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  submitBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.submitBookSuccess),
      tap(({ data }) => {
        console.log(data);

        // do create challenge
        const payload: ICreateChallenge = {
          title: data.title,
          status: 'publish',
          parent: data.id,
          meta: {
            number_of_pages: data.meta.number_of_pages,
            book: data.id,
            from_datetime: new TZDate(new Date(), "Asia/Jakarta").toISOString(),
            status: 'ongoing',
          }
        }

        this.challengeService.createChallenge(payload);
        this.challengeService.clearMedia();
      }),
    ), { dispatch: false }
  )
  
  submitBookFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.submitBookFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // UPDATE BOOK
  // ...
  updateBook$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateBook),
      mergeMap(action => 
        this.httpService.updateBook(action.pid, action.payload).pipe(
          map(res => ReadingChallengeActions.updateBookSuccess({ data: res, payload: action.payload, challengeId: action.challengeId })),
          catchError(error => of(ReadingChallengeActions.updateBookFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  updateBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateBookSuccess),
      tap(({ data, challengeId }) => {
        console.log(data);

        // do create challenge
        const payload: ICreateChallenge = {
          title: data.title,
          status: 'publish',
          parent: data.id,
          meta: {
            number_of_pages: data.meta.number_of_pages,
            from_datetime: new TZDate(new Date(), "Asia/Jakarta").toISOString(),
            status: 'ongoing',
          }
        }

        this.challengeService.updateChallenge(challengeId as number, payload);
        this.challengeService.clearMedia();
      }),
    ), { dispatch: false }
  )
  
  updateBookFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateBookFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // CREATE CHALLENGE
  // ...
  createChallenge$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.createChallenge),
      mergeMap(action => 
        this.httpService.createChallenge(action.payload).pipe(
          map(res => ReadingChallengeActions.createChallengeSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ReadingChallengeActions.createChallengeFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  createChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.createChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router
          .navigate(['/tabs/reading-challenge/new'], { replaceUrl: true })
          .then(() => {
            // load challenges
            this.loadChallenges();
          });
      }),
    ), { dispatch: false }
  )
  
  createChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.createChallengeFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // UPDATE CHALLENGE
  // ...
  updateChallenge$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateChallenge),
      mergeMap(action => 
        this.httpService.updateChallenge(action.pid, action.payload).pipe(
          map(res => ReadingChallengeActions.updateChallengeSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ReadingChallengeActions.updateChallengeFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  updateChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router
          .navigate(['/tabs/reading-challenge/new'], { replaceUrl: true })
          .then(() => {
            // load challenges
            this.loadChallenges();
          });
      }),
    ), { dispatch: false }
  )
  
  updateChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateChallengeFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // DELETE CHALLENGE
  // ...
  deleteChallenge$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.deleteChallenge),
      mergeMap(action => 
        this.httpService.deleteChallenge(action.pid).pipe(
          map(res => ReadingChallengeActions.deleteChallengeSuccess({ data: res })),
          catchError(error => of(ReadingChallengeActions.deleteChallengeFailure({ error: error }))),
        )
      )
    )
  )

  deleteChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.deleteChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router
          .navigate(['/tabs/reading-challenge/new'], { replaceUrl: true })
          .then(() => {
            // load challenges
            this.loadChallenges();
            this.presentToast('Berhasil dihapus', 'warning');
          });
      }),
    ), { dispatch: false }
  )
  
  deleteChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.deleteChallengeFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE CHALLENGE
  // ...
  retrieveChallenge$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveChallenge),
      mergeMap(action => 
        this.httpService.retrieveChallenge(action.pid).pipe(
          map(res => ReadingChallengeActions.retrieveChallengeSuccess({ data: res })),
          catchError(error => of(ReadingChallengeActions.retrieveChallengeFailure({ error: error }))),
        )
      )
    )
  )

  retrieveChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveChallengeFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET CHALLENGES
  // ...
  getChallenges$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ReadingChallengeActions.getChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ReadingChallengeActions.getChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getChallengesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE OTHER CHALLENGE
  // ...
  retrieveOtherChallenge$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveOtherChallenge),
      mergeMap(action => 
        this.httpService.retrieveChallenge(action.pid).pipe(
          map(res => ReadingChallengeActions.retrieveOtherChallengeSuccess({ data: res })),
          catchError(error => of(ReadingChallengeActions.retrieveOtherChallengeFailure({ error: error }))),
        )
      )
    )
  )

  retrieveOtherChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveOtherChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveOtherChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveOtherChallengeFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET OTHER CHALLENGES
  // ...
  getOtherChallenges$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getOtherChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ReadingChallengeActions.getOtherChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ReadingChallengeActions.getOtherChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getOtherChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getOtherChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getOtherChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getOtherChallengesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // LOAD MORE OTHER CHALLENGES
  // ...
  loadMoreOtherChallenges$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.loadMoreOtherChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ReadingChallengeActions.loadMoreOtherChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ReadingChallengeActions.loadMoreOtherChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadMoreOtherChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.loadMoreOtherChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  loadMoreOtherChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.loadMoreOtherChallengesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // CREATE READING
  // ...
  createReading$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.createReading),
      mergeMap(action => 
        this.httpService.createReading(action.payload).pipe(
          map(res => ReadingChallengeActions.createReadingSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ReadingChallengeActions.createReadingFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  createReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.createReadingSuccess),
      tap(({ data, payload }) => {
        console.log(data);
        this.router.navigate(['/tabs/reading-challenge/timer'], { 
          replaceUrl: true,
          queryParams: {
            readingId: data.id,
            challengeId: data.meta.challenge.ID,
            fromPage: (payload.meta.from_page ? parseInt(payload.meta.from_page) : 0) as number,
          }
        });
      }),
    ), { dispatch: false }
  )
  
  createReadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.createReadingFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE READING
  // ...
  retrieveReading$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveReading),
      mergeMap(action => 
        this.httpService.retrieveReading(action.pid).pipe(
          map(res => ReadingChallengeActions.retrieveReadingSuccess({ data: res })),
          catchError(error => of(ReadingChallengeActions.retrieveReadingFailure({ error: error }))),
        )
      )
    )
  )

  retrieveReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveReadingSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveReadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveReadingFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET READINGS
  // ...
  getReadings$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getReadings),
      mergeMap(action => 
        this.httpService.getReadings(action.filter).pipe(
          map(res => ReadingChallengeActions.getReadingsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ReadingChallengeActions.getReadingsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getReadingsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getReadingsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getReadingsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getReadingsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET READINGS DRAFT
  // ...
  getReadingsDraft$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getReadingsDraft),
      mergeMap(action => 
        this.httpService.getReadings(action.filter).pipe(
          map(res => ReadingChallengeActions.getReadingsDraftSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ReadingChallengeActions.getReadingsDraftFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getReadingsDraftSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getReadingsDraftSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getReadingsDraftFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getReadingsDraftFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // LOAD MORE READINGS
  // ...
  loadMoreReadings$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.loadMoreReadings),
      mergeMap(action => 
        this.httpService.getReadings(action.filter).pipe(
          map(res => ReadingChallengeActions.loadMoreReadingsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ReadingChallengeActions.loadMoreReadingsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  loadMoreReadingsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.loadMoreReadingsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  loadMoreReadingsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.loadMoreReadingsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // UPDATE READING
  // ...
  updateReading$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateReading),
      mergeMap(action => 
        this.httpService.updateReading(action.pid, action.payload).pipe(
          map(res => ReadingChallengeActions.updateReadingSuccess({ data: res, pid: action.pid, payload: action.payload })),
          catchError(error => of(ReadingChallengeActions.updateReadingFailure({ error: error, pid: action.pid, payload: action.payload }))),
        )
      )
    )
  )

  updateReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateReadingSuccess),
      tap(({ data, payload }) => {
        console.log(data);
        const action = payload?.extra?.action;

        if (action === 'continue-reading') {
          this.router.navigate(['/tabs/reading-challenge/timer'], { 
            replaceUrl: true,
            queryParams: {
              readingId: data.id,
              challengeId: data.meta.challenge.ID,
              fromPage: (data.meta.from_page ? parseInt(data.meta.from_page) : 0) as number,
            }
          });
        } else {
          this.router.navigate(['/tabs/feed', data.acivity_id], { 
            replaceUrl: true,
          }).then(() => {
            const filter: IFilter = {
              type: ['post_reading'],
              component: 'activity',
              page: 1,
              per_page: 25,
            }

            this.feedService.loadActivities(filter);
          });
        }
      }),
    ), { dispatch: false }
  )
  
  updateReadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.updateReadingFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // DELETE READING
  // ...
  deleteReading$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.deleteReading),
      mergeMap(action => 
        this.httpService.deleteReading(action.pid).pipe(
          map(res => ReadingChallengeActions.deleteReadingSuccess({ data: res, pid: action.pid, extra: action.extra })),
          catchError(error => of(ReadingChallengeActions.deleteReadingFailure({ error: error, pid: action.pid, extra: action.extra }))),
        )
      )
    )
  )

  deleteReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.deleteReadingSuccess),
      tap(({ data, extra }) => {
        console.log(data);
        const action = extra?.action;

        if (action == 'cancel') {
          this.presentToast("Berhasil dibatalkan, pilih ulang buku yang mau dibaca.", 'success');
        } else if (action == 'cancel-timer') {
          this.router.navigate(['/tabs/feed'], { replaceUrl: true });
          this.presentToast("Berhasil dibatalkan", 'success');
        }
      }),
    ), { dispatch: false }
  )
  
  deleteReadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.deleteReadingFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // UPLOAD MEDIA
  // ...
  uploadMedia$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.uploadMedia),
      mergeMap(action => 
        this.httpService.uploadMedia(action.pid as string, action.file).pipe(
          map(res => ReadingChallengeActions.uploadMediaSuccess({ data: res })),
          catchError(error => of(ReadingChallengeActions.uploadMediaFailure({ error: error }))),
        )
      )
    )
  )

  uploadMediaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.uploadMediaSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  uploadMediaFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.uploadMediaFailure),
      tap(({ error }) => {
        console.log(error);
        this.presentAlert(JSON.stringify(error));
      }),
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE BOOK
  // ...
  retrieveBook$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveBook),
      mergeMap(action => 
        this.httpService.retrieveBook(action.pid).pipe(
          map(res => ReadingChallengeActions.retrieveBookSuccess({ data: res })),
          catchError(error => of(ReadingChallengeActions.retrieveBookFailure({ error: error }))),
        )
      )
    )
  )

  retrieveBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveBookSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveBookFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.retrieveBookFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET TAGS
  // ...
  getTags$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getTags),
      mergeMap(action => 
        this.httpService.getTags(action.filter).pipe(
          map(res => ReadingChallengeActions.getTagsSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ReadingChallengeActions.getTagsFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getTagsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getTagsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getTagsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.getTagsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // STATS GET CHALLENGES
  // ...
  statsGetChallenges$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ReadingChallengeActions.statsGetChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ReadingChallengeActions.statsGetChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ReadingChallengeActions.statsGetChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  statsGetChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.statsGetChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  statsGetChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingChallengeActions.statsGetChallengesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )

}
