import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: false
})
export class TabsPage {

  public showTabs = signal<boolean>(true);
  public hideTabsUrls: string[] = [
    '/tabs/reading-challenge/new', 
    '/tabs/reading-challenge/timer',
    '/tabs/reading-challenge/summary',
  ];

  constructor(
    private router: Router,
  ) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      const url: string = this.router.url;

      if (event instanceof NavigationEnd) {
        if (this.hideTabsUrls.includes(url)) {
          this.showTabs.set(false);
        }
        else {
          this.showTabs.set(true);
        }
      }
    })
  }

}
