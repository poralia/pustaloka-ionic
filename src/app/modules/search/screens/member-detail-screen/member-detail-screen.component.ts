import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFriendshipRequest } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IPostFilter } from 'src/app/modules/reading-challenge/reading-challege.interface';
import { ChallengeService } from 'src/app/modules/reading-challenge/services/challenge.service';

@Component({
  selector: 'app-member-detail-screen',
  templateUrl: './member-detail-screen.component.html',
  styleUrls: ['./member-detail-screen.component.scss'],
  standalone: false,
})
export class MemberDetailScreenComponent  implements OnInit {

  public member$: Observable<{ data: any, statuses: string }>;
  public readings$: Observable<{ data: any, status: string }>;
  public uid: string | null = this.route.snapshot.paramMap.get('uid');
  public filter: IPostFilter = {
    author: this.uid as unknown as string,
    page: 1,
    per_page: 25,
  }
  private infiniteEvent: InfiniteScrollCustomEvent | null = null;
  public loadMoreEnabled: boolean = true;

  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.member$ = this.authService.selectMember();
    this.readings$ = this.challengeService.selectReadings();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe(action => {
      switch (action.type) {
        case '[ReadingChallenge] Load More Readings Success':
          this.loadMoreEnabled = true;
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
    this.authService.retrieveMember(this.uid as unknown as string);
    this.challengeService.getReadings(this.filter);
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

}
