import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPostFilter } from 'src/app/modules/reading-challenge/reading-challege.interface';
import { ChallengeService } from 'src/app/modules/reading-challenge/services/challenge.service';

@Component({
  selector: 'app-challenge-detail-screen',
  templateUrl: './challenge-detail-screen.component.html',
  styleUrls: ['./challenge-detail-screen.component.scss'],
  standalone: false,
})
export class ChallengeDetailScreenComponent  implements OnInit {

  public challengeId: string | null = this.route.snapshot.paramMap.get('pid');
  public challenge$: Observable<{ data: any, status: string }>;
  public readings$: Observable<{ data: any, status: string }>;
  public filter: IPostFilter = {
    author: '',
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

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
  ) { 
    this.challenge$ = this.challengeService.selectChallenge();
    this.readings$ = this.challengeService.selectReadings();
  }

  ngOnInit() {
    this.challengeService.retrieveChallenge(this.challengeId as unknown as number);
    this.challengeService.getReadings(this.filter);
  }

}
