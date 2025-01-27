import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: false
})
export class TabsPage {

  public me$: Observable<{ data: any, statuses: string }>;
  public showTabs = signal<boolean>(true);
  public hideTabsUrls: string[] = [
    '/tabs/challenge/new', 
    '/tabs/challenge/timer',
    '/tabs/challenge/summary',
    '/tabs/challenge/book-editor',
    '/tabs/challenge/challenges',
    '/tabs/feed/', 
    '/tabs/search/challenge',
    '/tabs/search/tags',
    '/tabs/search/members',
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      const url: string = this.router.url;

      if (event instanceof NavigationEnd) {
        const hideTab = this.hideTabsUrls.find(uri => url.includes(uri));
        if (hideTab) {
          this.showTabs.set(false);
        }
        else {
          this.showTabs.set(true);
        }
      }
    });

    this.me$ = this.authService.selectMe();
  }

}
