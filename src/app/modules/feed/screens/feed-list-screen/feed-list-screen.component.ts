import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Observable, reduce } from 'rxjs';
import { IFilter } from '../../feed.interfaces';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileCardComponent } from 'src/app/modules/shared/components/profile-card/profile-card.component';
import { ChallengeService } from 'src/app/modules/challenge/services/challenge.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IPostFilter, IUpdateReading } from 'src/app/modules/challenge/challenge.interface';
import { TZDate } from '@date-fns/tz';

@Component({
    selector: 'app-feed-list-screen',
    templateUrl: './feed-list-screen.component.html',
    styleUrls: ['./feed-list-screen.component.scss'],
    standalone: false,
})
export class FeedListScreenComponent  implements OnInit {

  @ViewChild(ProfileCardComponent) profileCard: ProfileCardComponent | null = null;

  public activities$: Observable<{ data: any, status: string }>;
  public drafts$: Observable<{ data: any, status: string }>;
  public filter: IFilter = {
    type: ['post_reading', 'post_review'],
    component: 'activity',
    page: 1,
    per_page: 25,
    scope: '',
    display_comments: '',
  }
  public filterValue: string = '';
  public inviniteEvent: InfiniteScrollCustomEvent | null = null;
  public loadMoreDisabled: boolean = false;

  constructor(
    private feedService: FeedService,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.activities$ = this.feedService.selectActivities();
    this.drafts$ = this.challengeService.selectReadingsDraft();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Feed] Load More Activities Success':
          this.inviniteEvent?.target?.complete();
          
          if (action.data.length <= 0) {
            this.loadMoreDisabled = true;
          } else {
            this.loadMoreDisabled = false;
          }
          break;
        case '[Feed] Load More Activities Failure':
          this.inviniteEvent?.target?.complete();
          break;
      }
    });
  }

  ngOnInit() {
    this.feedService.loadActivities(this.filter);
    this.getReadingsDraft();
  }

  async getReadingsDraft() {
    const auth = await this.authService.getAuth();
    if (auth) {
      const filter: IPostFilter = {
        page: 1,
        per_page: 10,
        author: auth.user_id,
        status: 'draft',
      }

      this.challengeService.getReadingsDraft(filter);
    }
  }

  onIonInfinite(ev: any) {
    // sum page
    this.filter = {
      ...this.filter,
      page: this.filter.page + 1,
    }

    this.feedService.loadMoreActivities(this.filter);
    this.inviniteEvent = (ev as InfiniteScrollCustomEvent);
  }

  filterHandler(event: any) {
    this.filterValue = event.target.value;
    this.filter = {
      ...this.filter,
      scope: this.filterValue,
      page: 1,
    }
    this.feedService.loadActivities(this.filter);
  }

  handleRefresh(event: CustomEvent) {
    this.filterValue = '';
    this.filter = {
      ...this.filter,
      page: 1,
      scope: '',
    }
    this.feedService.loadActivities(this.filter);
    this.profileCard?.refresh();

    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 1000);
  }

  /**
   * Continue reading
   */
  continueReading(reading: any) {
    const payload: IUpdateReading = {
      status: 'draft',
      meta: {
        from_datetime: reading.meta.from_datetime,
        from_page: reading.meta.from_page,
        to_page: reading.meta.to_page,
        to_datetime: '',
      },
    }
    
    const extra = {
      action: 'continue-reading',
    }

    this.challengeService.updateReading(reading.id, payload, extra);
  }

}
