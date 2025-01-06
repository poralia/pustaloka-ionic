import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reading-list-screen',
  templateUrl: './reading-list-screen.component.html',
  styleUrls: ['./reading-list-screen.component.scss'],
  standalone: false,
})
export class ReadingListScreenComponent  implements OnInit {

  public challenges$: Observable<{ data: any, status: string }>;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private challengeService: ChallengeService,
  ) { 
    this.challenges$ = this.challengeService.selectChallenges();

    // detect router changed
    this.router.events.pipe(takeUntilDestroyed()).subscribe(router => {
      if (router instanceof NavigationEnd) {
        if (router.url.includes('/reading-challenge/challenges')) {
          this.getChallenges();
        }
      }
    })
  }

  ngOnInit() {}

  async getChallenges() {
    const auth = await this.authService.getAuth();

    if (auth) {
      this.challengeService.getChallenges({ 
        author: auth.user_id,
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
