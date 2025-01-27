import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Granim from 'granim';
import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { TZDate } from '@date-fns/tz';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addSeconds, differenceInMilliseconds, differenceInSeconds, parseISO } from 'date-fns';
import { ActionsSubject } from '@ngrx/store';

export interface IPauseHistory {
  id: number
  from_datetime: string
  to_datetime: string
}

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

  // Pause histories
  public pauseLogs = signal<IPauseHistory[]>([]);
  public lastLog: any = null;

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
    private actionsSubject$: ActionsSubject,
  ) { 
    this.reading$ = this.challengeService.selectReading();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((state: any) => {
      switch(state.type) {
        case '[Challenge] Retrieve Reading Success':
          // set pause log
          const previousPauseLogs = state.data.meta?.pause_log;
          if (previousPauseLogs && previousPauseLogs.length > 0) {
            const logs = previousPauseLogs.map((obj: any) => {
              return {
                id: obj[0],
                from_datetime: obj[1],
                to_datetime: obj[2],
              }
            });

            this.pauseLogs.update(values => {
              return [
                ...values,
                ...logs,
              ]
            });

            this.lastLog = this.pauseLogs()[this.pauseLogs()?.length - 1];

            // if last log to datetime is empty indicate current status is PAUSED
            const toDatetime = this.lastLog?.to_datetime;
            const fromDatetime = this.lastLog?.from_datetime;
            const pauseDuration = this.pauseDuration();
            const getTimeFromDatetime = parseISO(state.data.meta.from_datetime)
            const xSecondsFromDatetime = addSeconds(getTimeFromDatetime, pauseDuration);
            const tt = new TZDate(xSecondsFromDatetime, "Asia/Jakarta");

            if (this.lastLog && (toDatetime == '' || !toDatetime)) {
              this.isPlay.set(!this.isPlay());
              this.initializeStopwatch(fromDatetime, tt.toISOString());
            } else {
              // start stopwatch
              this.startStopwatch(tt.toISOString());
            }
          } else {
            // start stopwatch
            this.startStopwatch(state.data.meta.from_datetime);
          }
          break;
      }
    });
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
            this.router.navigate(['/tabs/challenge/summary'], { 
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
  }

  /**
   * Calculate pause duration
   * in seconds
   */
  pauseDuration(): number {
    const pauseLogs = this.pauseLogs();
    const differences = pauseLogs.map((p: any) => {
      const fromDatetime = p?.from_datetime;
      const toDatetime = p?.to_datetime;
      let difference = 0;

      if (fromDatetime && toDatetime) {
        difference = differenceInSeconds(toDatetime, fromDatetime);
      }

      return difference;
    });

    // in seconds
    return differences.reduce((sum: number, current: number) => sum + current, 0);
  }

  /**
   * Set state play or pause
   */
  playPauseHandler(reading: any) {
    const fromDatetime = reading?.meta?.from_datetime;
    this.isPlay.set(!this.isPlay());

    if (!this.isPlay()) {
      this.stopStopwatch();
      
      this.pauseLogs.update(values => {
        return [
          ...values,
          {
            id: + new Date(), // timestamp
            from_datetime: new TZDate(new Date(), "Asia/Jakarta").toISOString(),
            to_datetime: '',
          }
        ]
      });
    }
    else {
      // check to_datetime empty
      const prev = this.pauseLogs().find(obj => obj.to_datetime == '' || !obj.to_datetime);
      const prevId = prev?.id;

      // update
      if (prevId) {
        const index = this.pauseLogs().findIndex(obj => obj.id == prevId);
        this.pauseLogs.update(values => {
          return [
            ...values.slice(0, index),
            {
              ...values[index],
              to_datetime: new TZDate(new Date(), "Asia/Jakarta").toISOString(),
            },
            ...values.slice(index + 1),
          ]
        });

        // reset last log
        this.lastLog = this.pauseLogs()[this.pauseLogs()?.length - 1];
      }

      this.startStopwatchFromPause(fromDatetime);
    }

    const pausesHistory = this.pauseLogs().map(obj => {
      return [obj.id, obj.from_datetime, obj.to_datetime]
    });

    // save pause histories
    this.challengeService.updateReading(
      this.readingId as unknown as number,
      {
        status: 'draft',
        meta: {
          pause_log: pausesHistory,
        }
      },
      {
        action: 'pause',
      }
    );
  }

  startStopwatch(from?: string) {
    let time = new Date().getTime();
    if (from) time = parseISO(from).getTime();

    if (!this.stopwatchInterval) {
      this.startTime = time - this.elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      this.stopwatchInterval = setInterval(() => {
        this.updateStopwatch();
      }, 1000); // update every second
    }
  }

  startStopwatchFromPause(from: string) {
    // in seconds
    const pauseDuration = this.pauseDuration();
    const fromX = new TZDate(addSeconds(parseISO(from), pauseDuration), "Asia/Jakarta");
    const time = fromX.getTime();
    this.elapsedPausedTime = pauseDuration;
 
    if (!this.stopwatchInterval) {
      this.startTime = time - this.elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      this.stopwatchInterval = setInterval(() => {
        this.updateStopwatch();
      }, 1000); // update every second
    }
  }

  initializeStopwatch(from: string, startFrom: string) {
    const time = new TZDate(parseISO(startFrom), "Asia/Jakarta").getTime();
    this.startTime = time - this.elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    
    let currentTime = new TZDate(parseISO(from), "Asia/Jakarta").getTime(); // get current time in milliseconds
    let elapsedTime = currentTime - this.startTime; // calculate elapsed time in milliseconds
    let seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours

    this.hour = this.pad(hours);
    this.minute = this.pad(minutes);
    this.second = this.pad(seconds);
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

  pad(number: number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }

}
