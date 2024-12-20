import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadingChallengePage } from './reading-challenge.page';

import { ReadingChallengePageRoutingModule } from './reading-challenge-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReadingChallengePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    ReadingChallengePage,
  ]
})
export class ReadingChallengePageModule {}
