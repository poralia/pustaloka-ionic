import { Component, effect, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterMember } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { KeywordSignalService } from '../../services/keyword-signal.service';

@Component({
  selector: 'app-member-list-screen',
  templateUrl: './member-list-screen.component.html',
  styleUrls: ['./member-list-screen.component.scss'],
  standalone: false,
})
export class MemberListScreenComponent  implements OnInit {

  public filter: IFilterMember = {
    page: 1,
    per_page: 25,
    search: '',
    type: 'random',
  }
  public members$: Observable<{ data: any, statuses: string }>;

  constructor(
    private authService: AuthService,
    private keywordSignalService: KeywordSignalService,
  ) { 
    this.members$ = this.authService.selectMembers();

    effect(() => {
      const keyword = this.keywordSignalService.get();
      if (keyword) {
        this.filter = {
          ...this.filter,
          search: keyword,
        }

        this.authService.getMembers(this.filter);
      }
    });
  }

  ngOnInit() {
    this.getMembers();
  }

  async getMembers() {
    const auth = await this.authService.getAuth();
    this.filter = {
      ...this.filter,
      exclude: [auth.user_id],
    }
    this.authService.getMembers(this.filter);
  }

}
