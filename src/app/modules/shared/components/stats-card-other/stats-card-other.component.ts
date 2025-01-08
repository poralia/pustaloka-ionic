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
import { callback } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-stats-card-other',
  templateUrl: './stats-card-other.component.html',
  styleUrls: ['./stats-card-other.component.scss'],
  standalone: false,
})
export class StatsCardOtherComponent  implements OnInit {

  @ViewChild('changeDateModal', { read: IonModal }) changeDateModal: IonModal | null = null;
  @Input('uid') uid: string | number | null = null;
  
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
    view: 'pages_everyday',
  }

  constructor(
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
    private decimalPipe: DecimalPipe,
  ) { 
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Get Stats Success':
          const behavior = action?.extra?.behavior;
          if (behavior == 'other') {
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

    this.authService.getStats(this.filter, { behavior: 'other' });
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

    const totalPages = pages.reduce((acc: any, curr: any) => acc + curr, 0);
    const totalMinutes = minutes.reduce((acc: any, curr: any) => acc + curr, 0);

    const data = {
      labels: labels,
      datasets: [
        {
          label: `${totalPages > 0 ? this.decimalPipe.transform(totalPages, '1.0') : ''} Halaman`,
          data: pages,
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
        },
        {
          label: `${totalMinutes > 0 ? this.decimalPipe.transform(totalMinutes, '1.0') : ''} Menit`,
          data: minutes,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          display: true,
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
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
