import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
  standalone: false,
})
export class MemberItemComponent  implements OnInit {

  @Input('props') props: { member: any } = {
    member: null,
  }
  
  constructor() { }

  ngOnInit() {}

}
