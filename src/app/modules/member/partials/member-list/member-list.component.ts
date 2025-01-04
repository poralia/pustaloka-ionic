import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFriendFilter } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  standalone: false,
})
export class MemberListComponent  implements OnInit {

  @Input('status') status: string = 'confirmed';

  public friends$: Observable<{ data: any, statuses: string }>;

  public filter: IFriendFilter = {
    page: 1,
    per_page: 25,
    context: 'view',
  }
  
  constructor(
    private authService: AuthService,
  ) { 
    this.friends$ = this.authService.selectFriends();
  }

  ngOnInit() {
    this.getFriends();
  }

  async getFriends() {
    const auth = await this.authService.getAuth();

    this.filter = {
      ...this.filter,
      user_id: auth.user_id,
    }

    if (this.status === 'confirmed') {
      this.filter = {
        ...this.filter,
        user_id: auth.user_id,
        is_confirmed: 1,
        show_as: 'friend',
      }
    } else if (this.status === 'incoming') {
      this.filter = {
        ...this.filter,
        friend_id: auth.user_id,
        is_confirmed: 0,
        show_as: 'incoming',
      }
    } else if (this.status === 'requested') {
      this.filter = {
        ...this.filter,
        initiator_id: auth.user_id,
        is_confirmed: 0,
        show_as: 'requested',
      }
    }

    this.authService.getFriends(this.filter);

    this.filter = {
      page: 1,
      per_page: 25,
      context: 'view',
    }
  }

}
