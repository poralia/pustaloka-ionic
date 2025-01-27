import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ICreateReading, IPostFilter, IUpdateReading } from 'src/app/modules/challenge/challenge.interface';
import { ChallengeService } from 'src/app/modules/challenge/services/challenge.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { endOfDay, format, parseISO } from 'date-fns';
import { TZDate } from "@date-fns/tz";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: false,
})
export class ProfileCardComponent  implements OnInit {

  @ViewChild(IonModal) ionModal: IonModal | null = null;
  
  public challenges$: Observable<{ data: any, status: string }>;
  public me$: Observable<{ data: any, statuses: string }>;
  public challenge: any;
  public reading: any;
  public swiper: Swiper | null = null;

  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService,
    private alertCtrl: AlertController,
    private actionsSubject$: ActionsSubject,
    private router: Router,
  ) { 
    this.challenges$ = this.challengeService.selectChallenges();
    this.me$ = this.authService.selectMe();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((state: any) => {
      switch (state.type) {
        case '[Challenge] Get Readings Success':
          const action = state?.extra?.action;

          if (action === 'check-draft') {
            if (state.data.length > 0) {
              this.reading = state.data[0];
              this.ionModal?.present();
            } else {
              if (this.challenge) {
                this.createReading();
              }
            }
          }
          
          break;
        
        case '[Challenge] Get Challenges Success':
          let slidesPerView = 1.1;
          if (state.data.length <= 1) {
            slidesPerView = 1;
          }

          this.initializeSwiper(slidesPerView);
          break;
      }
    });
  }

  async logoutHandler() {
    const alrt = await this.alertCtrl.create({
      header: 'Konfirmasi',
      subHeader: 'Ingin logout dari akun?',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
        },
        {
          text: 'IYA',
          role: 'destructive',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alrt.present();
  }

  ngOnInit() {
    this.getChallenges();
    this.authService.retrieveMe();
  }

  initializeSwiper(slidesPerView: number) {
    this.swiper = new Swiper('.swiper-challenge', {
      modules: [Pagination],
      slidesPerView: slidesPerView,
      spaceBetween: 16,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    });
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
        from_datetime: new TZDate(new Date(), "Asia/Jakarta").toISOString(),
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
        from_datetime: this.challenge.meta.from_datetime,
        from_page: this.challenge.meta.from_page,
        to_page: this.challenge.meta.to_page,
        to_datetime: '',
      },
    }

    const extra = {
      action: 'continue-reading',
    }

    this.challengeService.updateReading(this.reading.id, payload, extra);
    this.ionModal?.dismiss();
  }

  /**
   * Close modal
   */
  closeHandler() {
    this.ionModal?.dismiss();
  }

  /**
   * Refresh everything
   */
  refresh() {
    this.getChallenges();
    this.authService.retrieveMe();
  }

}
