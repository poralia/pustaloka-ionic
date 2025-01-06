import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-reading-challenge-list-screen',
    templateUrl: './reading-challenge-list-screen.component.html',
    styleUrls: ['./reading-challenge-list-screen.component.scss'],
    standalone: false
})
export class ReadingChallengeListScreenComponent  implements OnInit {

  public challenges$: Observable<{ data: any, status: string }>;
    
  constructor(
    private router: Router,
    private authService: AuthService,
    private challengeService: ChallengeService,
  ) { 
    this.challenges$ = this.challengeService.selectStatsChallenges();
  }

  ngOnInit() { 
    this.getChallenges();
  }

  async getChallenges() {
    const auth = await this.authService.getAuth();

    if (auth) {
      this.challengeService.statsGetChallenges({ 
        author: auth.user_id,
        page: 1,
        per_page: 100,
        meta_query: {
          relation: 'AND',
          0: {
            key: 'status',
            value: 'done',
            compare: '=',
          }
        }
      });
    }
  }

}
