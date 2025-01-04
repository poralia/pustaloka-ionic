import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { IonicModule } from '@ionic/angular';
import { MemberListComponent } from './partials/member-list/member-list.component';
import { MemberItemComponent } from './partials/member-item/member-item.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberItemComponent,
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    IonicModule,
  ],
  exports: [
    MemberListComponent,
    MemberItemComponent,
  ]
})
export class MemberModule { }
