import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { IonicModule } from '@ionic/angular';
import { FeedListScreenComponent } from './screens/feed-list-screen/feed-list-screen.component';
import { FeedDetailScreenComponent } from './screens/feed-detail-screen/feed-detail-screen.component';
import { SharedModule } from "../shared/shared.module";
import { FeedItemComponent } from './partials/feed-item/feed-item.component';


@NgModule({
  declarations: [
    FeedListScreenComponent,
    FeedDetailScreenComponent,
    FeedItemComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    IonicModule,
    SharedModule
]
})
export class FeedModule { }
