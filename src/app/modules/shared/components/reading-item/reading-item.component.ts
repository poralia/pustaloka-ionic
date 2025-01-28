import { Component, Input, OnInit } from '@angular/core';
import { differenceInMinutes, intervalToDuration, parseISO } from 'date-fns';

@Component({
  selector: 'app-reading-item',
  templateUrl: './reading-item.component.html',
  styleUrls: ['./reading-item.component.scss'],
  standalone: false,
})
export class ReadingItemComponent  implements OnInit {

  @Input('item') item: any;
  @Input('currentUserId') currentUserId: any;
  
  constructor() { }

  ngOnInit() {}

  getDuration(item: any) {
    if (item.meta?.from_datetime) {
      return differenceInMinutes(
        item.meta?.to_datetime,
        item.meta?.from_datetime
      );
    }

    return 0;
  }

}
