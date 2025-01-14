import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { differenceInMinutes, intervalToDuration, parseISO } from 'date-fns';

@Component({
    selector: 'app-feed-item',
    templateUrl: './feed-item.component.html',
    styleUrls: ['./feed-item.component.scss'],
    standalone: false
})
export class FeedItemComponent  implements OnInit {

  public duration: string = '-';

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
      ) as unknown as string;
    }
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
