import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengePage } from './challenge.page';

import { ChallengePageRoutingModule } from './challenge-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChallengePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    ChallengePage,
  ]
})
export class ChallengePageModule {}
