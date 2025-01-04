import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
  standalone: false,
})
export class EventItemComponent  implements OnInit {

  @Input('props') props: { event: any } = {
    event: null,
  };
  
  constructor() { }

  ngOnInit() {}

}
