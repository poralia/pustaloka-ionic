import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengePage } from './challenge.page';

const routes: Routes = [
  {
    path: '',
    component: ChallengePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../../../modules/challenge/challenge.module').then(m => m.ChallengeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengePageRoutingModule {}
