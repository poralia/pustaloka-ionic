import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { differenceInMinutes, differenceInSeconds, intervalToDuration, parseISO } from 'date-fns';

@Component({
    selector: 'app-feed-item',
    templateUrl: './feed-item.component.html',
    styleUrls: ['./feed-item.component.scss'],
    standalone: false
})
export class FeedItemComponent  implements OnInit {

  public duration: number = 0;

  @Input('props') props: {
    item: any,
  } | any = {}

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // calculate duration
    if (this.props.item?.reading?.from_datetime) {
      this.duration = differenceInMinutes(
        this.props.item.reading.to_datetime,
        this.props.item.reading.from_datetime
      );
    }
  }

  getPauseDuration(activity: any) {
    const pauseLog = activity?.reading?.pause_log;

    if (pauseLog.length > 0) {
      return this.calculatePauseDuration(pauseLog);
    } else {
      return 0;
    }
  }

  /**
   * Get duration in seconds convert to minutes
   */
  calculatePauseDuration(pauseLogs: any[]): number {
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

  clickHandler(item: any, event: any) {
    let toComment: boolean = false;

    if (event.target.nodeName === 'ION-TEXT') {
      let button = event.target.parentElement;
      if (button.nodeName == 'ION-BUTTON' && button.getAttribute('id') === 'to-comment') {
        toComment = true;
      }
    } else if (event.target.nodeName === 'ION-BUTTON' && event.target.getAttribute('id') === 'to-comment') {
      toComment = true;
    }

    this.router.navigate(['/tabs/feed', item.id], { queryParams: {
      toComment: toComment,
    }});
  }

}
