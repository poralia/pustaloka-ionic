import { Component, effect, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostFilter } from 'src/app/modules/challenge/challenge.interface';
import { ChallengeService } from 'src/app/modules/challenge/services/challenge.service';
import { KeywordSignalService } from '../../services/keyword-signal.service';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-challenge-list-screen',
  templateUrl: './challenge-list-screen.component.html',
  styleUrls: ['./challenge-list-screen.component.scss'],
  standalone: false,
})
export class ChallengeListScreenComponent  implements OnInit {

  public filter: IPostFilter = {
    author: '',
    page: 1,
    per_page: 25,
    search: '',
    search_columns: ['post_title', 'post_content'],
  }
  public challenges$: Observable<{ data: any, status: string }>;
  private infiniteEvent: InfiniteScrollCustomEvent | null = null;
  public loadMoreEnabled: boolean = true;

  constructor(
    private challengeService: ChallengeService,
    private keywordSignalService: KeywordSignalService,
    private actionSubject$: ActionsSubject,
  ) { 
    this.challenges$ = this.challengeService.selectOtherChallenges();

    effect(() => {
      const keyword = this.keywordSignalService.get();
      if (keyword && keyword != '') {
        this.filter = {
          ...this.filter,
          search: keyword,
          orderby: 'relevance',
        }

        this.challengeService.getOtherChallenges(this.filter);
      }
    });

    // listen state
    this.actionSubject$.pipe(takeUntilDestroyed()).subscribe(action => {
      switch (action.type) {
        case '[Challenge] Load More Other Challenges Success':
          if (this.infiniteEvent) this.infiniteEvent.target.complete();
          break;
        case '[Challenge] Load More Other Challenges Failure':
          this.loadMoreEnabled = false;
          if (this.infiniteEvent) this.infiniteEvent.target.complete();
          break;
      }
    });
  }

  ngOnInit() {
    this.challengeService.getOtherChallenges(this.filter);
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
