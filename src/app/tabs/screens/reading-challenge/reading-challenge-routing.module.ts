import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingChallengePage } from './reading-challenge.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingChallengePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../../../modules/reading-challenge/reading-challenge.module').then(m => m.ReadingChallengeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingChallengePageRoutingModule {}
