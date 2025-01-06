import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './screens/welcome-screen/welcome-screen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'welcome',
        component: WelcomeScreenComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
