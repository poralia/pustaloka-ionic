import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChallengeEffects } from './challenge.effects';

describe('ChallengeEffects', () => {
  let actions$: Observable<any>;
  let effects: ChallengeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChallengeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ChallengeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
