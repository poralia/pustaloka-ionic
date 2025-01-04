import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Observable } from 'rxjs';
import { IFilter } from '../../feed.interfaces';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileCardComponent } from 'src/app/modules/shared/components/profile-card/profile-card.component';

@Component({
    selector: 'app-feed-list-screen',
    templateUrl: './feed-list-screen.component.html',
    styleUrls: ['./feed-list-screen.component.scss'],
    standalone: false,
})
export class FeedListScreenComponent  implements OnInit {

  @ViewChild(ProfileCardComponent) profileCard: ProfileCardComponent | null = null;

  public activities$: Observable<{ data: any, status: string }>;
  public filter: IFilter = {
    type: ['post_reading'],
    component: 'activity',
    page: 1,
    per_page: 25,
    scope: '',
    display_comments: '',
  }
  public filterValue: string = '';
  public inviniteEvent: InfiniteScrollCustomEvent | null = null;

  constructor(
    private feedService: FeedService,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.activities$ = this.feedService.selectActivities();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe(action => {
      switch (action.type) {
        case '[Feed] Load More Activities Success':
        case '[Feed] Load More Activities Failure':
          this.inviniteEvent?.target?.complete();
          break;
      }
    });
  }

  ngOnInit() {
    this.feedService.loadActivities(this.filter);
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

}
