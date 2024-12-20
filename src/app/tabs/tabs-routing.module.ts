import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('./screens/feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'reading-challenge',
        loadChildren: () => import('./screens/reading-challenge/reading-challenge.module').then(m => m.ReadingChallengePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./screens/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
