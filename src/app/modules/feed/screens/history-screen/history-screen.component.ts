import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { IPostFilter } from 'src/app/modules/reading-challenge/reading-challege.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ChallengeService } from 'src/app/modules/reading-challenge/services/challenge.service';

@Component({
  selector: 'app-history-screen',
  templateUrl: './history-screen.component.html',
  styleUrls: ['./history-screen.component.scss'],
  standalone: false,
})
export class HistoryScreenComponent  implements OnInit {

  public challengeId: string | null = this.route.snapshot.queryParamMap.get('challenge');
  public bookId: string | null = this.route.snapshot.queryParamMap.get('book');
  public filter: IPostFilter = {
    author: '0',
    page: 1,
    per_page: 25,
    meta_query: {
      relation: 'AND',
      0: {
        key: 'challenge',
        value: this.challengeId,
        compare: '=',
      }
    }
  }
  public histories$: Observable<{ data: any, status: string }>;
  public book$: Observable<{ data: any, status: string }>;

  constructor(
    private feedService: FeedService,
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { 
    this.histories$ = this.feedService.selectReadingHistories();
    this.book$ = this.challengeService.selectBook();
  }

  ngOnInit() {
    this.loadReadingHistories();
  }

  async loadReadingHistories() {
    // load a book
    this.challengeService.retrieveBook(this.bookId as unknown as number);

    const auth = await this.authService.getAuth();
    if (auth) {
      this.filter = {
        ...this.filter,
        author: auth.user_id,
      }

      this.feedService.getReadingHistories(this.filter);
    }
  }

}
