import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChallengeActions } from '../../actions/challenge/challenge.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ChallengeService } from '../../../services/challenge.service';
import { HttpService } from '../../../services/http.service';
import { ICreateChallenge, ICreateReading } from '../../../challenge.interface';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/modules/feed/services/feed.service';
import { IFilter } from 'src/app/modules/feed/feed.interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { TZDate } from '@date-fns/tz';



@Injectable()
export class ChallengeEffects {

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
      ofType(ChallengeActions.submitBook),
      mergeMap(action => 
        this.httpService.submitBook(action.payload).pipe(
          map(res => ChallengeActions.submitBookSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ChallengeActions.submitBookFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  submitBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.submitBookSuccess),
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
      ofType(ChallengeActions.submitBookFailure),
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
      ofType(ChallengeActions.updateBook),
      mergeMap(action => 
        this.httpService.updateBook(action.pid, action.payload).pipe(
          map(res => ChallengeActions.updateBookSuccess({ data: res, payload: action.payload, challengeId: action.challengeId })),
          catchError(error => of(ChallengeActions.updateBookFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  updateBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateBookSuccess),
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
      ofType(ChallengeActions.updateBookFailure),
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
      ofType(ChallengeActions.createChallenge),
      mergeMap(action => 
        this.httpService.createChallenge(action.payload).pipe(
          map(res => ChallengeActions.createChallengeSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ChallengeActions.createChallengeFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  createChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.createChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router
          .navigate(['/tabs/challenge/new'], { replaceUrl: true })
          .then(() => {
            // load challenges
            this.loadChallenges();
          });
      }),
    ), { dispatch: false }
  )
  
  createChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.createChallengeFailure),
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
      ofType(ChallengeActions.updateChallenge),
      mergeMap(action => 
        this.httpService.updateChallenge(action.pid, action.payload).pipe(
          map(res => ChallengeActions.updateChallengeSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ChallengeActions.updateChallengeFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  updateChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router
          .navigate(['/tabs/challenge/new'], { replaceUrl: true })
          .then(() => {
            // load challenges
            this.loadChallenges();
          });
      }),
    ), { dispatch: false }
  )
  
  updateChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateChallengeFailure),
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
      ofType(ChallengeActions.deleteChallenge),
      mergeMap(action => 
        this.httpService.deleteChallenge(action.pid).pipe(
          map(res => ChallengeActions.deleteChallengeSuccess({ data: res })),
          catchError(error => of(ChallengeActions.deleteChallengeFailure({ error: error }))),
        )
      )
    )
  )

  deleteChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.deleteChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
        this.router
          .navigate(['/tabs/challenge/new'], { replaceUrl: true })
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
      ofType(ChallengeActions.deleteChallengeFailure),
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
      ofType(ChallengeActions.retrieveChallenge),
      mergeMap(action => 
        this.httpService.retrieveChallenge(action.pid).pipe(
          map(res => ChallengeActions.retrieveChallengeSuccess({ data: res })),
          catchError(error => of(ChallengeActions.retrieveChallengeFailure({ error: error }))),
        )
      )
    )
  )

  retrieveChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveChallengeFailure),
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
      ofType(ChallengeActions.getChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ChallengeActions.getChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ChallengeActions.getChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getChallengesFailure),
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
      ofType(ChallengeActions.retrieveOtherChallenge),
      mergeMap(action => 
        this.httpService.retrieveChallenge(action.pid).pipe(
          map(res => ChallengeActions.retrieveOtherChallengeSuccess({ data: res })),
          catchError(error => of(ChallengeActions.retrieveOtherChallengeFailure({ error: error }))),
        )
      )
    )
  )

  retrieveOtherChallengeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveOtherChallengeSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveOtherChallengeFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveOtherChallengeFailure),
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
      ofType(ChallengeActions.getOtherChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ChallengeActions.getOtherChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ChallengeActions.getOtherChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getOtherChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getOtherChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getOtherChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getOtherChallengesFailure),
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
      ofType(ChallengeActions.loadMoreOtherChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ChallengeActions.loadMoreOtherChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ChallengeActions.loadMoreOtherChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  loadMoreOtherChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreOtherChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  loadMoreOtherChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreOtherChallengesFailure),
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
      ofType(ChallengeActions.createReading),
      mergeMap(action => 
        this.httpService.createReading(action.payload).pipe(
          map(res => ChallengeActions.createReadingSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ChallengeActions.createReadingFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  createReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.createReadingSuccess),
      tap(({ data, payload }) => {
        console.log(data);
        this.router.navigate(['/tabs/challenge/timer'], { 
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
      ofType(ChallengeActions.createReadingFailure),
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
      ofType(ChallengeActions.retrieveReading),
      mergeMap(action => 
        this.httpService.retrieveReading(action.pid).pipe(
          map(res => ChallengeActions.retrieveReadingSuccess({ data: res })),
          catchError(error => of(ChallengeActions.retrieveReadingFailure({ error: error }))),
        )
      )
    )
  )

  retrieveReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveReadingSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveReadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveReadingFailure),
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
      ofType(ChallengeActions.getReadings),
      mergeMap(action => 
        this.httpService.getReadings(action.filter).pipe(
          map(res => ChallengeActions.getReadingsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ChallengeActions.getReadingsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getReadingsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getReadingsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getReadingsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getReadingsFailure),
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
      ofType(ChallengeActions.getReadingsDraft),
      mergeMap(action => 
        this.httpService.getReadings(action.filter).pipe(
          map(res => ChallengeActions.getReadingsDraftSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ChallengeActions.getReadingsDraftFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getReadingsDraftSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getReadingsDraftSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getReadingsDraftFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getReadingsDraftFailure),
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
      ofType(ChallengeActions.loadMoreReadings),
      mergeMap(action => 
        this.httpService.getReadings(action.filter).pipe(
          map(res => ChallengeActions.loadMoreReadingsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ChallengeActions.loadMoreReadingsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  loadMoreReadingsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreReadingsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  loadMoreReadingsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreReadingsFailure),
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
      ofType(ChallengeActions.updateReading),
      mergeMap(action => 
        this.httpService.updateReading(action.pid, action.payload).pipe(
          map(res => ChallengeActions.updateReadingSuccess({ data: res, pid: action.pid, payload: action.payload, extra: action.extra })),
          catchError(error => of(ChallengeActions.updateReadingFailure({ error: error, pid: action.pid, payload: action.payload, extra: action.extra }))),
        )
      )
    )
  )

  updateReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateReadingSuccess),
      tap(({ data, payload, extra }) => {
        console.log(data);
        const action = extra?.action;

        if (action === 'pause') {
          // pause action here
          console.log(payload, extra)
        } else {
          if (action === 'continue-reading') {
            this.router.navigate(['/tabs/challenge/timer'], { 
              replaceUrl: true,
              queryParams: {
                readingId: data.id,
                challengeId: data.meta.challenge.ID,
                fromPage: (data.meta.from_page ? parseInt(data.meta.from_page) : 0) as number,
              }
            });
          } else {
            this.presentToast("Berhasil disimpan.", 'success');
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
        }
      }),
    ), { dispatch: false }
  )
  
  updateReadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateReadingFailure),
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
      ofType(ChallengeActions.deleteReading),
      mergeMap(action => 
        this.httpService.deleteReading(action.pid).pipe(
          map(res => ChallengeActions.deleteReadingSuccess({ data: res, pid: action.pid, extra: action.extra })),
          catchError(error => of(ChallengeActions.deleteReadingFailure({ error: error, pid: action.pid, extra: action.extra }))),
        )
      )
    )
  )

  deleteReadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.deleteReadingSuccess),
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
      ofType(ChallengeActions.deleteReadingFailure),
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
      ofType(ChallengeActions.uploadMedia),
      mergeMap(action => 
        this.httpService.uploadMedia(action.pid as string, action.file).pipe(
          map(res => ChallengeActions.uploadMediaSuccess({ data: res })),
          catchError(error => of(ChallengeActions.uploadMediaFailure({ error: error }))),
        )
      )
    )
  )

  uploadMediaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.uploadMediaSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  uploadMediaFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.uploadMediaFailure),
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
      ofType(ChallengeActions.retrieveBook),
      mergeMap(action => 
        this.httpService.retrieveBook(action.pid).pipe(
          map(res => ChallengeActions.retrieveBookSuccess({ data: res })),
          catchError(error => of(ChallengeActions.retrieveBookFailure({ error: error }))),
        )
      )
    )
  )

  retrieveBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveBookSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveBookFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveBookFailure),
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
      ofType(ChallengeActions.getTags),
      mergeMap(action => 
        this.httpService.getTags(action.filter).pipe(
          map(res => ChallengeActions.getTagsSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ChallengeActions.getTagsFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  getTagsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getTagsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getTagsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getTagsFailure),
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
      ofType(ChallengeActions.statsGetChallenges),
      mergeMap(action => 
        this.httpService.getChallenges(action.filter).pipe(
          map(res => ChallengeActions.statsGetChallengesSuccess({ data: res, filter: action.filter })),
          catchError(error => of(ChallengeActions.statsGetChallengesFailure({ error: error, filter: action.filter }))),
        )
      )
    )
  )

  statsGetChallengesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.statsGetChallengesSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  statsGetChallengesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.statsGetChallengesFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // CREATE REVIEW
  // ...
  createReview$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChallengeActions.createReview),
      mergeMap(action => 
        this.httpService.createReview(action.payload).pipe(
          map(res => ChallengeActions.createReviewSuccess({ data: res, payload: action.payload })),
          catchError(error => of(ChallengeActions.createReviewFailure({ error: error, payload: action.payload }))),
        )
      )
    )
  )

  createReviewSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.createReviewSuccess),
      tap(({ data, payload }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  createReviewFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.createReviewFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // RETRIEVE REVIEW
  // ...
  retrieveReview$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveReview),
      mergeMap(action => 
        this.httpService.retrieveReview(action.pid).pipe(
          map(res => ChallengeActions.retrieveReviewSuccess({ data: res })),
          catchError(error => of(ChallengeActions.retrieveReviewFailure({ error: error }))),
        )
      )
    )
  )

  retrieveReviewSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveReviewSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  retrieveReviewFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.retrieveReviewFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // GET REVIEWS
  // ...
  getReviews$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChallengeActions.getReviews),
      mergeMap(action => 
        this.httpService.getReviews(action.filter).pipe(
          map(res => ChallengeActions.getReviewsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ChallengeActions.getReviewsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  getReviewsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getReviewsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  getReviewsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getReviewsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // LOAD MORE REVIEWS
  // ...
  loadMoreReviews$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreReviews),
      mergeMap(action => 
        this.httpService.getReviews(action.filter).pipe(
          map(res => ChallengeActions.loadMoreReviewsSuccess({ data: res, filter: action.filter, extra: action.extra })),
          catchError(error => of(ChallengeActions.loadMoreReviewsFailure({ error: error, filter: action.filter, extra: action.extra }))),
        )
      )
    )
  )

  loadMoreReviewsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreReviewsSuccess),
      tap(({ data }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  loadMoreReviewsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.loadMoreReviewsFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // UPDATE REVIEW
  // ...
  updateReview$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChallengeActions.updateReview),
      mergeMap(action => 
        this.httpService.updateReview(action.pid, action.payload).pipe(
          map(res => ChallengeActions.updateReviewSuccess({ data: res, pid: action.pid, payload: action.payload })),
          catchError(error => of(ChallengeActions.updateReviewFailure({ error: error, pid: action.pid, payload: action.payload }))),
        )
      )
    )
  )

  updateReviewSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateReviewSuccess),
      tap(({ data, payload }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  updateReviewFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.updateReviewFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )


  // ...
  // DELETE REVIEW
  // ...
  deleteReview$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChallengeActions.deleteReview),
      mergeMap(action => 
        this.httpService.deleteReview(action.pid).pipe(
          map(res => ChallengeActions.deleteReviewSuccess({ data: res, pid: action.pid, extra: action.extra })),
          catchError(error => of(ChallengeActions.deleteReviewFailure({ error: error, pid: action.pid, extra: action.extra }))),
        )
      )
    )
  )

  deleteReviewSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.deleteReviewSuccess),
      tap(({ data, extra }) => {
        console.log(data);
      }),
    ), { dispatch: false }
  )
  
  deleteReviewFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.deleteReviewFailure),
      tap(({ error }) => {
        console.log(error);
      }),
    ), { dispatch: false }
  )

}
