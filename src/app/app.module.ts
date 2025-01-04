import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthReducer } from './modules/auth/state/reducers/auth/auth.reducer';
import { AuthEffects } from './modules/auth/state/effects/auth/auth.effects';
import { FeedEffects } from './modules/feed/state/effects/feed/feed.effects';
import { ReadingChallengeEffects } from './modules/reading-challenge/state/effects/reading-challenge/reading-challenge.effects';
import { UserEffects } from './modules/user/state/effects/user/user.effects';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptor } from './modules/shared/services/http.interceptor';
import { pendingRequestsInterceptor$, NgHttpLoaderComponent } from 'ng-http-loader';
import { FeedReducer } from './modules/feed/state/reducers/feed/feed.reducer';
import { ReadingChallengeReducer } from './modules/reading-challenge/state/reducers/reading-challenge/reading-challenge.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'md',
    }), 
    AppRoutingModule, 
    StoreModule.forRoot({
      auth: AuthReducer,
      feed: FeedReducer,
      readingChallenge: ReadingChallengeReducer,
    }, {}), 
    EffectsModule.forRoot([
      AuthEffects,
      FeedEffects,
      ReadingChallengeEffects,
      UserEffects,
    ]),
    NgHttpLoaderComponent,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors(
        [httpInterceptor, pendingRequestsInterceptor$]
      )
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
