import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ReadingChallengeRoutingModule } from './reading-challenge-routing.module';
import { ReadingChallengeDetailScreenComponent } from './screens/reading-challenge-detail-screen/reading-challenge-detail-screen.component';
import { ReadingChallengeItemComponent } from './partials/reading-challenge-item/reading-challenge-item.component';
import { ReadingChallengeListScreenComponent } from './screens/reading-challenge-list-screen/reading-challenge-list-screen.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ReadingChallengeEditorScreenComponent } from './screens/reading-challenge-editor-screen/reading-challenge-editor-screen.component';
import { ReadingChallengeTimerScreenComponent } from './screens/reading-challenge-timer-screen/reading-challenge-timer-screen.component';
import { ReadingChallengeSummaryScreenComponent } from './screens/reading-challenge-summary-screen/reading-challenge-summary-screen.component';


@NgModule({
  declarations: [
    ReadingChallengeDetailScreenComponent,
    ReadingChallengeListScreenComponent,
    ReadingChallengeEditorScreenComponent,
    ReadingChallengeTimerScreenComponent,
    ReadingChallengeSummaryScreenComponent,
    ReadingChallengeItemComponent,
  ],
  imports: [
    CommonModule,
    ReadingChallengeRoutingModule,
    IonicModule,
    SharedModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class ReadingChallengeModule { }
