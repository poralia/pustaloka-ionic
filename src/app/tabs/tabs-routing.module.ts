import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authenticatedGuard } from '../modules/auth/guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [authenticatedGuard],
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
        path: 'search',
        loadChildren: () => import('./screens/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'information',
        loadChildren: () => import('./screens/information/information.module').then(m => m.InformationPageModule)
      },
      {
        path: 'member',
        loadChildren: () => import('./screens/member/member.module').then(m => m.MemberPageModule)
      },
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
