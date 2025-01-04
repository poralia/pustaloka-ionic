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
import { TimerScreenComponent } from './screens/timer-screen/timer-screen.component';
import { SummaryScreenComponent } from './screens/summary-screen/summary-screen.component';
import { BookChoiceScreenComponent } from './screens/book-choice-screen/book-choice-screen.component';
import { BookEditorScreenComponent } from './screens/book-editor-screen/book-editor-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadingListScreenComponent } from './screens/reading-list-screen/reading-list-screen.component';


@NgModule({
  declarations: [
    ReadingChallengeDetailScreenComponent,
    ReadingChallengeListScreenComponent,
    TimerScreenComponent,
    SummaryScreenComponent,
    ReadingListScreenComponent,
    ReadingChallengeItemComponent,
    BookChoiceScreenComponent,
    BookEditorScreenComponent,
  ],
  imports: [
    CommonModule,
    ReadingChallengeRoutingModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class ReadingChallengeModule { }
