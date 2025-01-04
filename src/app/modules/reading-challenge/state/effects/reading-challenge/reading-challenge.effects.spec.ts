import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReadingChallengeEffects } from './reading-challenge.effects';

describe('ReadingChallengeEffects', () => {
  let actions$: Observable<any>;
  let effects: ReadingChallengeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReadingChallengeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ReadingChallengeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
