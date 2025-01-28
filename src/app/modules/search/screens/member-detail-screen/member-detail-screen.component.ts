import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFriendshipRequest } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IPostFilter } from 'src/app/modules/challenge/challenge.interface';
import { ChallengeService } from 'src/app/modules/challenge/services/challenge.service';
import { IFilter } from 'src/app/modules/feed/feed.interfaces';
import { FeedService } from 'src/app/modules/feed/services/feed.service';
import { StatsCardOtherComponent } from 'src/app/modules/shared/components/stats-card-other/stats-card-other.component';

@Component({
  selector: 'app-member-detail-screen',
  templateUrl: './member-detail-screen.component.html',
  styleUrls: ['./member-detail-screen.component.scss'],
  standalone: false,
})
export class MemberDetailScreenComponent  implements OnInit {

  @ViewChild(StatsCardOtherComponent) otherCardComponent: StatsCardOtherComponent | null = null;

  public member$: Observable<{ data: any, statuses: string }>;
  public activities$: Observable<{ data: any, status: string }>;
  public uid: string | null = this.route.snapshot.paramMap.get('uid');
  public filter: IFilter = {
      type: ['post_reading', 'post_review'],
      component: 'activity',
      page: 1,
      per_page: 25,
      scope: '',
      display_comments: '',
      user_id: this.uid as unknown as number,
    }
  private infiniteEvent: InfiniteScrollCustomEvent | null = null;
  public loadMoreEnabled: boolean = true;

  constructor(
    private authService: AuthService,
    private feedService: FeedService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.member$ = this.authService.selectMember();
    this.activities$ = this.feedService.selectOtherActivities();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Feed] Load More Other Activities Success':
          if (action?.data?.length > 0) {
            this.loadMoreEnabled = true;
          } else {
            this.loadMoreEnabled = false;
          }
          this.infiniteEvent?.target?.complete();
          break;
        case '[Feed] Load More Other Activities Failure':
          this.loadMoreEnabled = false;
          this.infiniteEvent?.target?.complete();
          break;
      }
    });
  }

  ngOnInit() {
    this.authService.retrieveMember(this.uid as unknown as string);
    this.filter = {
      ...this.filter,
      user_id: this.uid as unknown as number,
    }
    this.feedService.loadOtherActivities(this.filter);
  }

  onIonInfinite(ev: any) {
    // sum page
    this.filter = {
      ...this.filter,
      page: this.filter.page ? this.filter.page + 1 : 1,
    }

    this.feedService.loadMoreOtherActivities(this.filter);
    this.infiniteEvent = (ev as InfiniteScrollCustomEvent);
  }

  async friendshipHandler(friendId: number) {
    const auth = await this.authService.getAuth();

    if (auth) {
      const initiatorId = auth.user_id;
      const payload: IFriendshipRequest = {
        initiator_id: initiatorId,
        friend_id: friendId,
      }

      this.authService.friendshipRequest(payload);
    }
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
    this.otherCardComponent?.ionViewDidLeave();
  }

}
