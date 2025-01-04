import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-member',
    templateUrl: 'member.page.html',
    styleUrls: ['member.page.scss'],
    standalone: false
})
export class MemberPage implements OnInit {

  public segmentValue: string = 'friend';
  public me$: Observable<{ data: any, statuses: string }>;

  constructor(
    private authService: AuthService,
  ) {
    this.me$ = this.authService.selectMe();
  }

  changeHandler(event: any) {
    this.segmentValue = event.target.value;
  }

  ngOnInit() {
    this.authService.retrieveMe();
  }

}
