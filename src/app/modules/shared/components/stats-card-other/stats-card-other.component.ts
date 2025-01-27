import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TZDate } from '@date-fns/tz';
import { IonModal } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import Chart, { plugins } from 'chart.js/auto';
import { addMonths, format, parseISO, startOfMonth } from 'date-fns';
import { IStatsFilter } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stats-card-other',
  templateUrl: './stats-card-other.component.html',
  styleUrls: ['./stats-card-other.component.scss'],
  standalone: false,
})
export class StatsCardOtherComponent  implements OnInit {

  @ViewChild('changeDateModal', { read: IonModal }) changeDateModal: IonModal | null = null;
  @Input('uid') uid: string | number | null = null;
  @Input('showHeader') showHeader: boolean = true;
  
  public displayStat: boolean = false;
  public changeDateBehavior: string = 'from';
  public selectedDatetime: any;
  public fromDatetime: any = new TZDate(new Date(), "Asia/Jakarta");
  public startOfMonth: any = startOfMonth(this.fromDatetime);
  public toDatetime: any = addMonths(this.startOfMonth.toISOString(), 1);
  public chart: any;

  public filter: IStatsFilter = {
    uid: '',
    from_date: format(this.startOfMonth, 'yyyy-MM-dd'),
    to_date: format(this.toDatetime, 'yyyy-MM-dd'),
    view: 'daily',
  }

  constructor(
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
    private decimalPipe: DecimalPipe,
  ) { 
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Get Daily Stats Success':
          const target = action?.extra?.target;
          const view = action.filter.view;

          if (target == 'other' && view == 'daily') {
            setTimeout(() => {
              this.initializeCharts(action.data);
              this.displayStat = true;
            }, 250);
          }
          break;
      }
    })
  }

  ngOnInit() {
    this.loadStats();
  }

  async loadStats() {
    const auth = await this.authService.getAuth();
    if (auth) {
      this.filter = {
        ...this.filter,
        uid: auth.user_id,
      }
    }

    if (this.uid) {
      this.filter = {
        ...this.filter,
        uid: this.uid,
      }
    }

    this.authService.getDailyStats(this.filter, { target: 'other' });
  }

  initializeCharts(payload: any) {
    const ctx = document.getElementById('myChart-user-' + this.uid);

    const labels = payload.map((item: any) => {
      return parseISO(item.post_date).getDate();
    });

    const pages = payload.map((item: any) => {
      return parseInt(item.total_reading_page);
    });

    const minutes = payload.map((item: any) => {
      return Math.round(parseInt(item.spending_time) / 60);
    });

    const pauseDurations = payload.map((item: any) => {
      return Math.round(parseInt(item.pause_duration) / 60);
    });

    const effectiveDurations = payload.map((item: any) => {
      return Math.round(parseInt(item.effective_duration) / 60);
    });

    const totalPages = pages.reduce((acc: any, curr: any) => acc + curr, 0);
    const totalMinutes = minutes.reduce((acc: any, curr: any) => acc + curr, 0);
    const totalPauseDurations = pauseDurations.reduce((acc: any, curr: any) => acc + curr, 0);
    const totalEffectiveDurations = effectiveDurations.reduce((acc: any, curr: any) => acc + curr, 0);

    const data = {
      labels: labels,
      datasets: [
        {
          label: `${totalPages > 0 ? this.decimalPipe.transform(totalPages, '1.0') : ''} Halaman`,
          data: pages,
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
        },
        {
          label: `${totalEffectiveDurations > 0 ? this.decimalPipe.transform(totalEffectiveDurations, '1.0') : ''} Menit`,
          data: effectiveDurations,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
        }
        // {
        //   label: `${totalMinutes > 0 ? this.decimalPipe.transform(totalMinutes, '1.0') : ''} Menit`,
        //   data: minutes,
        //   backgroundColor: ['rgba(75, 192, 192, 0.6)'],
        // },
        // {
        //   label: `${totalPauseDurations > 0 ? this.decimalPipe.transform(totalPauseDurations, '1.0') : ''} Jeda`,
        //   data: pauseDurations,
        //   backgroundColor: ['rgba(255, 159, 64, 0.6)'],
        // },
        // {
        //   label: `${totalEffectiveDurations > 0 ? this.decimalPipe.transform(totalEffectiveDurations, '1.0') : ''} Efektif`,
        //   data: effectiveDurations,
        //   backgroundColor: ['rgba(153, 102, 255, 0.6'],
        // }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            stacked: false,
          },
          x: {
            beginAtZero: true,
            stacked: false,
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            align: 'center',
            fullSize: false,
            labels: {
              boxWidth: 10,
              boxHeight: 10,
            },
            title: {
              display: false,
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                return ctx.dataset.label.replace(/\d+/g, '') + ': ' + ctx.formattedValue;
              },
            }
          }
        }
      },
    };
    
    // @ts-ignore
    this.chart = new Chart(ctx, config);
  }

  dateChangeHandler(behavior: string, date: any) {
    this.changeDateBehavior = behavior;
    this.selectedDatetime = format(date, 'yyyy-MM-dd');
    this.changeDateModal?.present();
  }

  closeChangeDateHandler() {
    this.changeDateModal?.dismiss();
  }

  dateChangedHandler(event: any) {
    this.selectedDatetime = new TZDate(event.detail.value, "Asia/Jakarta").toISOString();
  }

  confirmHandler() {
    if (this.changeDateBehavior == 'from') {
      // update from datetime
      this.fromDatetime = this.selectedDatetime;
      this.startOfMonth = this.fromDatetime;
      this.filter = {
        ...this.filter,
        from_date: format(this.startOfMonth, 'yyyy-MM-dd'),
      }
    }

    if (this.changeDateBehavior == 'to') {
      // update to datetime
      this.toDatetime = this.selectedDatetime;
      this.filter = {
        ...this.filter,
        to_date: format(this.toDatetime, 'yyyy-MM-dd'),
      }
    }

    this.chart.destroy();
    this.loadStats();
    this.changeDateModal?.dismiss();
  }

  ionViewDidLeave() {
    this.chart.destroy();
  }

}
