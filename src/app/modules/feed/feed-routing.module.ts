import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedListScreenComponent } from './screens/feed-list-screen/feed-list-screen.component';
import { FeedDetailScreenComponent } from './screens/feed-detail-screen/feed-detail-screen.component';
import { ReadingChallengeEditorScreenComponent } from '../reading-challenge/screens/reading-challenge-editor-screen/reading-challenge-editor-screen.component';

const routes: Routes = [
  {
    path: 'new',
    component: ReadingChallengeEditorScreenComponent,
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: FeedListScreenComponent,
      },
      {
        path: ':pid',
        component: FeedDetailScreenComponent,
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
