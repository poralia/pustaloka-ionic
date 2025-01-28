import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { differenceInMinutes, differenceInSeconds, intervalToDuration, parseISO } from 'date-fns';
import { ActionsSubject } from '@ngrx/store';
import { IPostFilter } from 'src/app/modules/challenge/challenge.interface';
import { ChallengeService } from 'src/app/modules/challenge/services/challenge.service';
import { ICreateActivity, IFilter } from '../../feed.interfaces';
import { InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-feed-detail-screen',
    templateUrl: './feed-detail-screen.component.html',
    styleUrls: ['./feed-detail-screen.component.scss'],
    standalone: false
})
export class FeedDetailScreenComponent  implements OnInit {

  @ViewChild('commentModal', { read: IonModal }) commentModal: IonModal | null = null;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport | null = null;

  public pid: string | null = this.route.snapshot.paramMap.get('pid');
  public toComment: string | null = this.route.snapshot.queryParamMap.get('toComment');
  public previousPage: string | null = this.route.snapshot.queryParamMap.get('previousPage');
  public activity$: Observable<{ data: any, status: string }>;
  public readings$: Observable<{ data: any, status: string }>;
  public comments$: Observable<{ data: any, status: string }>;
  public duration: number = 0;
  public commentFilter: IFilter = {
    page: 1,
    per_page: 15,
    type: ['activity_comment'],
    display_comments: 'stream',
    component: 'activity',
    primary_id: this.pid as unknown as number,
  }
  public infiniteEvent: any;
  public loadMoreEnabled: boolean = true;
  public commentContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedService: FeedService,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.activity$ = this.feedService.selectActivity(this.pid as unknown as number);
    this.readings$ = this.challengeService.selectReadings();
    this.comments$ = this.feedService.selectComments();

    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Feed] Retrieve Activity Success':
          const challengeId = action.data.challenge.ID;
          const authorId = action.data.user_id;
          const filter: IPostFilter = {
            author: authorId,
            status: 'publish',
            exclude: [action.data.secondary_item_id],
            meta_query: {
              relation: 'AND',
              0: {
                key: 'challenge',
                value: challengeId,
                compare: '=',
              }
            }
          }

          this.challengeService.getReadings(filter, { action: 'history' });
          this.calculateDuration(action.data);
          break;
        
        case '[Feed] Load More Comments Success':
          if (action.data.length <= 0) {
            this.loadMoreEnabled = false;
          }
          this.infiniteEvent.target.complete();
          break;

        case '[Feed] Load More Comments Failure':
          this.loadMoreEnabled = false;
          this.infiniteEvent.target.complete();
          break;
        
        case '[Feed] Post Comment Success':
          this.commentContent = '';
          break;
      }
    });
  }

  ngOnInit() {
    this.feedService.retrieveActivity(this.pid as unknown as number);
    this.getComments();
  }

  calculateDuration(activity: any) {
    // calculate duration
    this.duration = differenceInMinutes(
      activity.reading.to_datetime,
      activity.reading.from_datetime
    );

    return this.duration;
  }

  getPausedDuration(activity: any) {
    const pauseLog = activity?.reading?.pause_log;

    if (pauseLog.length > 0) {
      return this.getPauseDuration(pauseLog);
    } else {
      return 0;
    }
  }

  /**
   * Get duration in seconds convert to minutes
   */
  getPauseDuration(pauseLogs: any[]): number {
    if (pauseLogs.length > 0) {
      const differences = pauseLogs.map((p: any) => {
        const fromDatetime = p[1];
        const toDatetime = p[2];
        let difference = 0;

        if (fromDatetime && toDatetime) {
          difference = differenceInSeconds(toDatetime, fromDatetime) / 60;
        }

        return Math.floor(difference);
      });

      return differences.reduce((sum: number, current: number) => sum + current, 0);
    }

    return 0;
  }

  getComments() {
    this.feedService.loadComments(this.commentFilter);
  }

  ngAfterViewInit() {
    if (this.toComment === 'true') {
      this.commentModal?.present();
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.infiniteEvent = event;
    this.commentFilter = {
      ...this.commentFilter,
      page: this.commentFilter.page + 1,
    }

    this.feedService.loadMoreComments(this.commentFilter);
  }

  showCommentHandler() {
    this.commentModal?.present();
  }

  closeCommentHandler() {
    this.commentModal?.dismiss();
  }

  async submitCommentHandler(activity: any) {
    const auth = await this.authService.getAuth();
    if (auth) {
      const payload: ICreateActivity = {
        user_id: auth.user_id,
        component: 'activity',
        type: 'activity_comment',
        content: this.commentContent,
        primary_item_id: activity.id,
        secondary_item_id: activity.id,
      }

      this.feedService.postComment(payload);
    }
  }

  editHandler(activity: any) {
    this.router.navigate(['/tabs/challenge/summary'], { 
      replaceUrl: false,
      queryParams: {
        pid: activity.id,
        title: activity.book.post_title,
        bookCover: activity.book.featured_image_url,
        fromDatetime: activity.reading.from_datetime,
        toDatetime: activity.reading.to_datetime,
        fromPage: activity.reading.from_page,
        toPage: activity.reading.to_page,
        isEdit: true,
        readingId: activity.reading.ID,
      }
    });
  }

}
