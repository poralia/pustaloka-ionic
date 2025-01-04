import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPostFilter } from 'src/app/modules/reading-challenge/reading-challege.interface';
import { ChallengeService } from 'src/app/modules/reading-challenge/services/challenge.service';
import { intervalToDuration, parseISO } from 'date-fns';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-readings-list-screen',
  templateUrl: './readings-list-screen.component.html',
  styleUrls: ['./readings-list-screen.component.scss'],
  standalone: false,
})
export class ReadingsListScreenComponent  implements OnInit {

  public tid: string | null = this.route.snapshot.paramMap.get('tid');
  public name: string | null = this.route.snapshot.queryParamMap.get('name');
  public filter: IPostFilter = {
    author: '',
    page: 1,
    per_page: 25,
  }
  public readings$: Observable<{ data: any, status: string }>;
  private infiniteEvent: InfiniteScrollCustomEvent | null = null;
  public loadMoreEnabled: boolean = true;
  
  constructor(
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.readings$ = this.challengeService.selectReadings();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe(action => {
      switch (action.type) {
        case '[ReadingChallenge] Load More Readings Success':
          if (this.infiniteEvent) this.infiniteEvent.target.complete();
          break;
        case '[ReadingChallenge] Load More Readings Failure':
          this.loadMoreEnabled = false;
          if (this.infiniteEvent) this.infiniteEvent.target.complete();
          break;
      }
    });
  }

  ngOnInit() {
    this.filter = {
      ...this.filter,
      tags: this.tid,
    }

    this.challengeService.getReadings(this.filter);
  }

  getDuration(item: any) {
    let duration: any;

    // calculate duration
    if (item.meta?.from_datetime) {
      const { hours, minutes, seconds } = intervalToDuration({
        start: parseISO(item.meta?.from_datetime),
        end: parseISO(item.meta?.to_datetime),
      });

      if (hours) duration = `${hours} jam ${minutes} menit ${seconds} detik`;
      if (minutes) duration = `${minutes} menit ${seconds} detik`;
      if (seconds) duration = `${seconds} detik`;
    }

    return duration;
  }

  onIonInfinite(ev: any) {
    // sum page
    this.filter = {
      ...this.filter,
      page: this.filter.page ? this.filter.page + 1 : 1,
    }

    this.challengeService.loadMoreOtherChallenges(this.filter);
    this.infiniteEvent = (ev as InfiniteScrollCustomEvent);
  }

}
