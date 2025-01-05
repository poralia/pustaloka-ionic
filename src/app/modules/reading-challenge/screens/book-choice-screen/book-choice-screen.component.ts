import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { ChallengeService } from '../../services/challenge.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ICreateReading, IPostFilter, IUpdateReading } from '../../reading-challege.interface';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-choice-screen',
  templateUrl: './book-choice-screen.component.html',
  styleUrls: ['./book-choice-screen.component.scss'],
  standalone: false,
})
export class BookChoiceScreenComponent  implements OnInit {

  @ViewChild(IonModal) ionModal: IonModal | null = null;

  public challenges$: Observable<{ data: any, status: string }>;
  public challenge: any;
  public reading: any;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.challenges$ = this.challengeService.selectChallenges();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((state: any) => {
      switch (state.type) {
        case '[ReadingChallenge] Get Readings Success':
          const action = state?.extra?.action;

          if (action === 'check-draft') {
            if (state.data.length > 0) {
              this.reading = state.data[0];
              this.ionModal?.present();
            } else {
              this.createReading();
            }
          }
          
          break;
      }
    });
  }

  ngOnInit() {
    this.getChallenges();
  }

  async getChallenges() {
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

  /**
   * Choice confirmation
   */
  async choiceHandler(challenge: any) {
    const alrt = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Konfirmasi',
      subHeader: challenge.title.rendered,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Ya, Baca Ini',
          role: 'confirm',
          handler: () => {
            this.challenge = challenge;
            this.checkDraftReadingHandler();
          }
        }
      ]
    });

    await alrt.present();
  }

  /**
   * Check has draft reading or not
   */
  async checkDraftReadingHandler() {
    const auth = await this.authService.getAuth();

    if (auth) {
      const filter: IPostFilter = {
        author: auth.user_id,
        status: 'draft',
      }

      this.challengeService.getReadings(filter, { action: 'check-draft' });
    }
  }

  /**
   * Perform create reading
   */
  createReading() {
    // do create reading
    const prevPage = this.challenge?.meta?.reading?.to_page ? this.challenge.meta?.reading?.to_page : 0;
    const fromPage = (prevPage).toString() as string;
    const toPage = (prevPage).toString() as string;

    const payload: ICreateReading = {
      title: this.challenge.title.rendered,
      status: 'draft',
      meta: {
        challenge: this.challenge.id,
        from_datetime: new Date().toLocaleString('id', { timeZone: 'Asia/Jakarta' }),
        from_page: fromPage,
        to_page: toPage,
      }
    }

    this.challengeService.createReading(payload);
  }

  /**
   * Cancel reading
   */
  cancelHandler() {
    const extra = {'action': 'cancel'}
    this.challengeService.deleteReading(this.reading.id, extra);
    this.ionModal?.dismiss();
  }

  /**
   * Continue reading
   */
  confirmHandler() {
    const payload: IUpdateReading = {
      status: 'draft',
      meta: {
        from_datetime: new Date().toLocaleString('id', { timeZone: 'Asia/Jakarta' }),
        from_page: this.challenge.meta.from_page,
        to_page: this.challenge.meta.to_page,
        to_datetime: '',
      },
      extra: {
        action: 'continue-reading',
      }
    }

    this.challengeService.updateReading(this.reading.id, payload);
    this.ionModal?.dismiss();
  }

  /**
   * Close modal
   */
  closeHandler() {
    this.ionModal?.dismiss();
  }

}
