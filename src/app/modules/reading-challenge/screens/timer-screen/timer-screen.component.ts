import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Granim from 'granim';
import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { TZDate } from '@date-fns/tz';

@Component({
    selector: 'app-timer-screen',
    templateUrl: './timer-screen.component.html',
    styleUrls: ['./timer-screen.component.scss'],
    standalone: false
})
export class TimerScreenComponent  implements OnInit {

  public isPlay = signal<boolean>(true);
  public hour: string | null = '00';
  public minute: string | null = '00';
  public second: string | null = '00';

  // Stopwatch
  public startTime: any;
  public stopwatchInterval: any;
  public elapsedPausedTime: number = 0;

  public readingId: string | null = this.route.snapshot.queryParamMap.get('readingId');
  public challengeId: string | null = this.route.snapshot.queryParamMap.get('challengeId');
  public fromPage: string | null = this.route.snapshot.queryParamMap.get('fromPage');

  public reading$: Observable<{ data: any, status: string }>;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
  ) { 
    this.reading$ = this.challengeService.selectReading();
  }

  /**
   * Confirm for cancel
   */
  async cancelHandler(reading: any) {
    const alrt = await this.alertCtrl.create({
      message: 'Yakin ingin membatalkan?',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'YA',
          role: 'confirm',
          handler: () => {
            const extra = {'action': 'cancel-timer'}
            this.challengeService.deleteReading(reading.id, extra);
          }
        },
      ]
    });

    await alrt.present();
  }

  /**
   * Confirm for finish
   */
  async finishHandler(reading: any) {
    const alrt = await this.alertCtrl.create({
      message: 'Yakin bacanya sudah selesai?',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Belum',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'YA',
          role: 'confirm',
          handler: () => {
            this.resetStopwatch();
            this.router.navigate(['/tabs/reading-challenge/summary'], { 
              replaceUrl: true,
              queryParams: {
                pid: reading.id,
                title: reading.title.rendered,
                bookCover: reading.meta.book.book_cover,
                fromDatetime: reading.meta.from_datetime,
                toDatetime: new TZDate(new Date(), "Asia/Jakarta").toISOString(),
                fromPage: reading.meta.from_page,
              }
            });
          }
        },
      ]
    });

    await alrt.present();
  }

  ngOnInit() {
    this.challengeService.retrieveReading(this.readingId as unknown as number);
    this.fromPage = (this.fromPage ? parseInt(this.fromPage) + 1 : 1) as unknown as string;
  }

  ngAfterViewInit() {
    this.animatedGradientBackground();
    this.startStopwatch();
  }

  /**
   * Set state play or pause
   */
  playPauseHandler() {
    this.isPlay.set(!this.isPlay());

    if (!this.isPlay()) {
      this.stopStopwatch();
    }
    else {
      this.startStopwatch();
    }
  }

  /**
   * Animated gradient background
   */
  animatedGradientBackground() {
    setTimeout(() => {
      const granimInstance = new Granim({
        element: '#granim-canvas',
        // @ts-ignore
        opacity: [1, 1],
        name: 'granim',
        stateTransitionSpeed: 2000,
        states : {
          "default-state": {
            gradients: [
              ['#834D9B', '#D04ED6'],
              ['#1CD8D2', '#93EDC7']
            ]
          }
        }
      });
    }, 10);
  }
  
  startStopwatch() {
    if (!this.stopwatchInterval) {
      this.startTime = new Date().getTime() - this.elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      this.stopwatchInterval = setInterval(() => {
        this.updateStopwatch();
      }, 1000); // update every second
    }
  }

  stopStopwatch() {
    clearInterval(this.stopwatchInterval); // stop the interval
    this.elapsedPausedTime = new Date().getTime() - this.startTime; // calculate elapsed paused time
    this.stopwatchInterval = null; // reset the interval variable
  }

  resetStopwatch() {
    this.stopStopwatch(); // stop the interval
    this.elapsedPausedTime = 0; // reset the elapsed paused time variable

    this.hour = '00';
    this.minute = '00';
    this.second = '00';
  }

  updateStopwatch() {
    let currentTime = new Date().getTime(); // get current time in milliseconds
    let elapsedTime = currentTime - this.startTime; // calculate elapsed time in milliseconds
    let seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours

    this.hour = this.pad(hours);
    this.minute = this.pad(minutes);
    this.second = this.pad(seconds);
  }

  pad(number: number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }

}
