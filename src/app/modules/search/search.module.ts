import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import { SearchRoutingModule } from './search-routing.module';
import { IonicModule } from '@ionic/angular';
import { SearchIndexScreenComponent } from './screens/search-index-screen/search-index-screen.component';
import { SharedModule } from '../shared/shared.module';
import { MemberListScreenComponent } from './screens/member-list-screen/member-list-screen.component';
import { BookListScreenComponent } from './screens/book-list-screen/book-list-screen.component';
import { TopicListScreenComponent } from './screens/topic-list-screen/topic-list-screen.component';
import { EventListScreenComponent } from './screens/event-list-screen/event-list-screen.component';
import { NewsListScreenComponent } from './screens/news-list-screen/news-list-screen.component';
import { ChallengeListScreenComponent } from './screens/challenge-list-screen/challenge-list-screen.component';
import { ChallengeDetailScreenComponent } from './screens/challenge-detail-screen/challenge-detail-screen.component';
import { SearchNavComponent } from './partials/search-nav/search-nav.component';
import { TagsListScreenComponent } from './screens/tags-list-screen/tags-list-screen.component';
import { ReadingsListScreenComponent } from './screens/readings-list-screen/readings-list-screen.component';
import { MemberDetailScreenComponent } from './screens/member-detail-screen/member-detail-screen.component';


@NgModule({
  declarations: [
    SearchIndexScreenComponent,
    MemberListScreenComponent,
    BookListScreenComponent,
    TopicListScreenComponent,
    EventListScreenComponent,
    NewsListScreenComponent,
    ChallengeListScreenComponent,
    ChallengeDetailScreenComponent,
    TagsListScreenComponent,
    ReadingsListScreenComponent,
    MemberDetailScreenComponent,

    SearchNavComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    IonicModule,
    MatChipsModule,
    SharedModule,
  ]
})
export class SearchModule { }
