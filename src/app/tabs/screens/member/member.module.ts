import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberPage } from './member.page';

import { MemberPageRoutingModule } from './member-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MemberModule } from 'src/app/modules/member/member.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MemberPageRoutingModule,
    SharedModule,
    MemberModule,
  ],
  declarations: [
    MemberPage,
  ]
})
export class MemberPageModule {}
