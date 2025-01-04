import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailScreenComponent } from '../search/screens/member-detail-screen/member-detail-screen.component';

const routes: Routes = [
  {
    path: ':uid',
    component: MemberDetailScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
