import { Component, effect, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostFilter } from 'src/app/modules/challenge/challenge.interface';
import { ChallengeService } from 'src/app/modules/challenge/services/challenge.service';
import { KeywordSignalService } from '../../services/keyword-signal.service';

@Component({
  selector: 'app-tags-list-screen',
  templateUrl: './tags-list-screen.component.html',
  styleUrls: ['./tags-list-screen.component.scss'],
  standalone: false,
})
export class TagsListScreenComponent  implements OnInit {

  public tags$: Observable<{ data: any, status: string }>;
  public filter: IPostFilter = {
    author: '',
    page: 1,
    per_page: 100,
    orderby: 'count',
    search: '',
  }

  constructor(
    private challengeService: ChallengeService,
    private keywordSignalService: KeywordSignalService,
  ) { 
    this.tags$ = this.challengeService.selectTags();

    effect(() => {
      const keyword = this.keywordSignalService.get();
      this.filter = {
        ...this.filter,
        search: keyword,
      }

      this.challengeService.getTags(this.filter);
    });
}

  ngOnInit() {
    this.challengeService.getTags(this.filter);
  }

}
