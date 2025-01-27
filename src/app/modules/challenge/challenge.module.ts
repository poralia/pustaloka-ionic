import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ChallengeDetailScreenComponent } from './screens/challenge-detail-screen/challenge-detail-screen.component';
import { ChallengeItemComponent } from './partials/challenge-item/challenge-item.component';
import { ChallengeListScreenComponent } from './screens/challenge-list-screen/challenge-list-screen.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TimerScreenComponent } from './screens/timer-screen/timer-screen.component';
import { SummaryScreenComponent } from './screens/summary-screen/summary-screen.component';
import { BookChoiceScreenComponent } from './screens/book-choice-screen/book-choice-screen.component';
import { BookEditorScreenComponent } from './screens/book-editor-screen/book-editor-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadingListScreenComponent } from './screens/reading-list-screen/reading-list-screen.component';


@NgModule({
  declarations: [
    ChallengeDetailScreenComponent,
    ChallengeListScreenComponent,
    TimerScreenComponent,
    SummaryScreenComponent,
    ReadingListScreenComponent,
    ChallengeItemComponent,
    BookChoiceScreenComponent,
    BookEditorScreenComponent,
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class ChallengeModule { }
