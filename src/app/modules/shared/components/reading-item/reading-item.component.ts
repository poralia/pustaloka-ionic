import { Component, Input, OnInit } from '@angular/core';
import { intervalToDuration, parseISO } from 'date-fns';

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
    let duration: any;

    // calculate duration
    if (item.meta?.from_datetime) {
      const { hours, minutes, seconds } = intervalToDuration({
        start: parseISO(item.meta?.from_datetime),
        end: parseISO(item.meta?.to_datetime),
      });

      if (hours) duration = `${hours} jam ${minutes} menit ${seconds} detik`;
      if (minutes) duration = `${minutes} menit ${seconds} detik`;
      if (seconds) duration = `${seconds} detik`;
    }

    return duration;
  }

}
