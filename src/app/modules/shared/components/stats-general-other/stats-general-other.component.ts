import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TZDate } from '@date-fns/tz';
import { IonModal } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { addMonths, format, startOfMonth } from 'date-fns';
import { Observable } from 'rxjs';
import { IStatsFilter } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { StatsCardComponent } from '../stats-card/stats-card.component';

@Component({
  selector: 'app-stats-general-other',
  templateUrl: './stats-general-other.component.html',
  styleUrls: ['./stats-general-other.component.scss'],
  standalone: false,
})
export class StatsGeneralComponentOther  implements OnInit {

  @ViewChild('changeDateModal', { read: IonModal }) changeDateModal: IonModal | null = null;
  @ViewChild(StatsCardComponent) statsCardComponent: StatsCardComponent | null = null;

  @Input('uid') uid: string | number | null = null;
  
  public changeDateBehavior: string = 'from';
  public selectedDatetime: any;
  public fromDatetime: any = new TZDate(new Date(), "Asia/Jakarta");
  public startOfMonth: any = startOfMonth(this.fromDatetime);
  public toDatetime: any = addMonths(this.startOfMonth.toISOString(), 1);
  public stats$: Observable<{ data: any, statuses: string }>;

  public filter: IStatsFilter = {
    uid: '',
    from_date: format(this.startOfMonth, 'yyyy-MM-dd'),
    to_date: format(this.toDatetime, 'yyyy-MM-dd'),
    view: 'general',
  }

  constructor(
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
    private decimalPipe: DecimalPipe,
  ) { 
    this.stats$ = this.authService.selectGeneralStats();

    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Get General Stats Success':
          
          break;
      }
    });
  }

  ngOnInit() {
    this.loadStats();
  }

  async loadStats() {
    this.filter = {
      ...this.filter,
      uid: this.uid as string,
    }

    this.authService.getGeneralStats(this.filter, { target: 'self' });
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

    if (this.statsCardComponent) {
      this.statsCardComponent.externalTriggerHandler(this.filter);
    }
    this.loadStats();
    this.changeDateModal?.dismiss();
  }

  getMinutesFromSeconds(seconds: any) {
    const sec = Math.round(parseInt(seconds) / 60);
    return sec > 0 ? this.decimalPipe.transform(sec, '1.0') : 0;
  }

}
