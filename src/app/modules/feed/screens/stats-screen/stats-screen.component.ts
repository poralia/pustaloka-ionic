import { Component, OnInit } from '@angular/core';
import { TZDate } from '@date-fns/tz';
import { addMonths, format, startOfMonth } from 'date-fns';
import { IStatsFilter } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-stats-screen',
  templateUrl: './stats-screen.component.html',
  styleUrls: ['./stats-screen.component.scss'],
  standalone: false,
})
export class StatsScreenComponent  implements OnInit {

  public fromDatetime: any = new TZDate(new Date(), "Asia/Jakarta");
  public startOfMonth: any = startOfMonth(this.fromDatetime);
  public toDatetime: any = addMonths(this.startOfMonth.toISOString(), 1);
  public pagesEverydayFilter: IStatsFilter = {
    uid: '',
    from_date: format(this.startOfMonth, 'yyyy-MM-dd'),
    to_date: format(this.toDatetime, 'yyyy-MM-dd'),
    view: 'daily',
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    
  }

}
