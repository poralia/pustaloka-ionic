import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsHeaderComponent } from './components/tabs-header/tabs-header.component';
import { IonicModule } from '@ionic/angular';
import { UserStoryComponent } from './components/user-story/user-story.component';
import { MemberItemComponent } from './components/member-item/member-item.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ReadingItemComponent } from './components/reading-item/reading-item.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';

@NgModule({
  declarations: [
    TabsHeaderComponent,
    UserStoryComponent,
    MemberItemComponent,
    NewsItemComponent,
    BookItemComponent,
    EventItemComponent,
    FeedItemComponent,
    ProfileCardComponent,
    ReadingItemComponent,
    StatsCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatChipsModule,
    RouterModule,
  ],
  exports: [
    TabsHeaderComponent,
    UserStoryComponent,
    MemberItemComponent,
    NewsItemComponent,
    BookItemComponent,
    EventItemComponent,
    FeedItemComponent,
    ProfileCardComponent,
    ReadingItemComponent,
    StatsCardComponent,
  ]
})
export class SharedModule { }
