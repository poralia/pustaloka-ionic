import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeListScreenComponent } from './screens/challenge-list-screen/challenge-list-screen.component';
import { ChallengeDetailScreenComponent } from './screens/challenge-detail-screen/challenge-detail-screen.component';
import { TimerScreenComponent } from './screens/timer-screen/timer-screen.component';
import { SummaryScreenComponent } from './screens/summary-screen/summary-screen.component';
import { BookChoiceScreenComponent } from './screens/book-choice-screen/book-choice-screen.component';
import { BookEditorScreenComponent } from './screens/book-editor-screen/book-editor-screen.component';
import { ReadingListScreenComponent } from './screens/reading-list-screen/reading-list-screen.component';
import { ChallengeDetailScreenComponent as ChallengeDetailScreenSearchComponent } from '../search/screens/challenge-detail-screen/challenge-detail-screen.component';

const routes: Routes = [
  {
    path: 'new',
    component: BookChoiceScreenComponent,
  },
  {
    path: 'timer',
    component: TimerScreenComponent,
  },
  {
    path: 'summary',
    component: SummaryScreenComponent,
  },
  {
    path: 'book-editor',
    children: [
      {
        path: '',
        component: BookEditorScreenComponent,
      },
      {
        path: ':pid',
        component: BookEditorScreenComponent,
      }
    ]
  },
  {
    path: 'challenges',
    children: [
      {
        path: '',
        component: ChallengeListScreenComponent,
      },
      {
        path: ':pid',
        component: ChallengeDetailScreenSearchComponent,
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: ChallengeDetailScreenComponent,
      },
      {
        path: ':pid',
        component: ChallengeListScreenComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
