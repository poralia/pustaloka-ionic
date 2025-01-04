import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import { FeedRoutingModule } from './feed-routing.module';
import { IonicModule } from '@ionic/angular';
import { FeedListScreenComponent } from './screens/feed-list-screen/feed-list-screen.component';
import { FeedDetailScreenComponent } from './screens/feed-detail-screen/feed-detail-screen.component';
import { SharedModule } from "../shared/shared.module";
import { HistoryScreenComponent } from './screens/history-screen/history-screen.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeedListScreenComponent,
    FeedDetailScreenComponent,
    HistoryScreenComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    IonicModule,
    SharedModule,
    MatChipsModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FeedModule { }
