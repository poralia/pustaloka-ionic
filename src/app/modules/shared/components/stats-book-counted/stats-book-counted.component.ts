import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TZDate } from '@date-fns/tz';
import { id } from 'date-fns/locale';
import { IonModal } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import Chart, { plugins, Ticks } from 'chart.js/auto';
import { addMonths, addYears, endOfMonth, format, parseISO, startOfMonth, startOfYear } from 'date-fns';
import { IStatsFilter } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DecimalPipe } from '@angular/common';
import { callback } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-stats-book-counted',
  templateUrl: './stats-book-counted.component.html',
  styleUrls: ['./stats-book-counted.component.scss'],
  standalone: false,
})
export class StatsBookCountedComponent  implements OnInit {

  @ViewChild('changeDateModal', { read: IonModal }) changeDateModal: IonModal | null = null;
  
  @Input('uid') uid: string | number | null = null;
  @Input('title') title: string | number | null = null;
  
  public displayStat: boolean = false;
  public changeDateBehavior: string = 'from';
  public selectedDatetime: any;
  public fromDatetime: any = new TZDate(new Date(), "Asia/Jakarta");
  public startOfYear: any = startOfYear(this.fromDatetime);
  public toDatetime: any = addMonths(this.startOfYear.toISOString(), 6);
  public chart: any;

  public filter: IStatsFilter = {
    uid: '',
    from_date: format(this.startOfYear, 'yyyy-MM-dd'),
    to_date: format(endOfMonth(this.toDatetime), 'yyyy-MM-dd'),
    view: 'book',
  }

  constructor(
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
    private decimalPipe: DecimalPipe,
  ) { 
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Get Book Stats Success':
          const target = action?.extra?.target;
          const view = action.filter.view;
  
          if (target == 'self' && view == 'book') {
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

    
    this.authService.getBookStats(this.filter, { target: 'self' });
  }

  initializeCharts(payload: any) {
    if (this.chart) this.chart.destroy();

    const months = this.getMonths(this.filter.from_date, this.filter.to_date);
    const ctx = document.getElementById('booksCountChart');

    const labels = months.map((item: any) => {
      return  format(item.first, 'LLL', { locale: id }); 
    });

    const books = months.map((item: any) => {
      const date = format(item.first, 'yyyy-MM', { locale: id }); 
      const book = payload.find((obj: any) => obj.to_date == date);

      if (book) return parseInt(book.total);
      return 0;
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: `Buku`,
          data: books,
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
        },
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              autoSkip: false
            }
          },
          x: {
            ticks: {
              stepSize: 1,
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            display: false,
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
      this.startOfYear = this.fromDatetime;
      this.filter = {
        ...this.filter,
        from_date: format(this.startOfYear, 'yyyy-MM-dd'),
      }
    }

    if (this.changeDateBehavior == 'to') {
      // update to datetime
      this.toDatetime = this.selectedDatetime;
      this.filter = {
        ...this.filter,
        to_date: format(endOfMonth(this.toDatetime), 'yyyy-MM-dd'),
      }
    }

    this.chart.destroy();
    this.loadStats();
    this.changeDateModal?.dismiss();
  }

  getMonths(startDate: any, endDate: any){
    let resultList = [];
    let date = new Date(startDate);
    endDate = new Date(endDate);
    let monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    while (date <= endDate) {
      let stringDate = monthNameList[date.getMonth()] + " " + date.getFullYear();
      
      //get first and last day of month
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      resultList.push({
          str:stringDate,
          first:firstDay,
          last:lastDay,
      });
      date.setMonth(date.getMonth() + 1);
    }
    
    return resultList;
  }

}
