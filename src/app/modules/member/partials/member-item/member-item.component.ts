import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
  standalone: false,
})
export class MemberItemComponent  implements OnInit {
  
  @Input('item') item: any;
  @Input('status') status: string | null = null;
  
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {}

  acceptHandler(id: any) {
    this.authService.acceptFriendship(id);
  }

}
