import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedListScreenComponent } from './screens/feed-list-screen/feed-list-screen.component';
import { FeedDetailScreenComponent } from './screens/feed-detail-screen/feed-detail-screen.component';
import { HistoryScreenComponent } from './screens/history-screen/history-screen.component';
import { MemberDetailScreenComponent } from '../search/screens/member-detail-screen/member-detail-screen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FeedListScreenComponent,
      },
      {
        path: 'history',
        component: HistoryScreenComponent,
      },
      {
        path: ':pid',
        children: [
          {
            path: '',
            component: FeedDetailScreenComponent,
          },
          {
            path: ':uid',
            component: MemberDetailScreenComponent,
          }
        ]
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
