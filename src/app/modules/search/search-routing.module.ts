import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchIndexScreenComponent } from './screens/search-index-screen/search-index-screen.component';
import { MemberListScreenComponent } from './screens/member-list-screen/member-list-screen.component';
import { BookListScreenComponent } from './screens/book-list-screen/book-list-screen.component';
import { TopicListScreenComponent } from './screens/topic-list-screen/topic-list-screen.component';
import { EventListScreenComponent } from './screens/event-list-screen/event-list-screen.component';
import { NewsListScreenComponent } from './screens/news-list-screen/news-list-screen.component';
import { ChallengeListScreenComponent } from './screens/challenge-list-screen/challenge-list-screen.component';
import { ChallengeDetailScreenComponent } from './screens/challenge-detail-screen/challenge-detail-screen.component';
import { ReadingsListScreenComponent } from './screens/readings-list-screen/readings-list-screen.component';
import { MemberDetailScreenComponent } from './screens/member-detail-screen/member-detail-screen.component';

const routes: Routes = [
  {
    path: '',
    component: SearchIndexScreenComponent,
  },
  {
    path: 'challenge',
    children: [
      {
        path: ':pid',
        component: ChallengeDetailScreenComponent,
      },
    ],
  },
  {
    path: 'tags',
    children: [
      {
        path: ':tid',
        component: ReadingsListScreenComponent,
      },
    ],
  },
  {
    path: 'members',
    children: [
      {
        path: ':uid',
        component: MemberDetailScreenComponent,
      }
    ]
  }
];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
