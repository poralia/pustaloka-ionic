import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingChallengeListScreenComponent } from './screens/reading-challenge-list-screen/reading-challenge-list-screen.component';
import { ReadingChallengeDetailScreenComponent } from './screens/reading-challenge-detail-screen/reading-challenge-detail-screen.component';
import { ReadingChallengeEditorScreenComponent } from './screens/reading-challenge-editor-screen/reading-challenge-editor-screen.component';
import { ReadingChallengeTimerScreenComponent } from './screens/reading-challenge-timer-screen/reading-challenge-timer-screen.component';
import { ReadingChallengeSummaryScreenComponent } from './screens/reading-challenge-summary-screen/reading-challenge-summary-screen.component';

const routes: Routes = [
  {
    path: 'new',
    component: ReadingChallengeEditorScreenComponent,
  },
  {
    path: 'timer',
    component: ReadingChallengeTimerScreenComponent,
  },
  {
    path: 'summary',
    component: ReadingChallengeSummaryScreenComponent,
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
