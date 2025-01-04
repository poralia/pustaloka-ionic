import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import Swiper from 'swiper';
import { KeywordSignalService } from '../../services/keyword-signal.service';

@Component({
  selector: 'app-search-index-screen',
  templateUrl: './search-index-screen.component.html',
  styleUrls: ['./search-index-screen.component.scss'],
  standalone: false,
})
export class SearchIndexScreenComponent  implements OnInit {

  public endPath: string | undefined = '';
  public segmentValue: string = 'member';

  constructor(
    private router: Router,
    private keywordSignalService: KeywordSignalService,

  ) { 
    this.router.events.pipe(takeUntilDestroyed()).subscribe(router => {
      if (router instanceof NavigationEnd) {
        const urls = router.url.split('/');
        this.endPath = urls[urls.length - 1];
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-search-filter', {
      slidesPerView: 'auto',
      spaceBetween: 10,
    });
  }

  keywordInputHandler(event: any) {
    const value = event.target.value;
    this.keywordSignalService.set(value);
  }

  segmentChangeHandler(event: any) {
    this.segmentValue = event.target.value;
  }

}
