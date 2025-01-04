import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingChallengeListScreenComponent } from './screens/reading-challenge-list-screen/reading-challenge-list-screen.component';
import { ReadingChallengeDetailScreenComponent } from './screens/reading-challenge-detail-screen/reading-challenge-detail-screen.component';
import { TimerScreenComponent } from './screens/timer-screen/timer-screen.component';
import { SummaryScreenComponent } from './screens/summary-screen/summary-screen.component';
import { BookChoiceScreenComponent } from './screens/book-choice-screen/book-choice-screen.component';
import { BookEditorScreenComponent } from './screens/book-editor-screen/book-editor-screen.component';
import { ReadingListScreenComponent } from './screens/reading-list-screen/reading-list-screen.component';

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
        component: ReadingListScreenComponent,
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: ReadingChallengeDetailScreenComponent,
      },
      {
        path: ':pid',
        component: ReadingChallengeListScreenComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingChallengeRoutingModule { }
