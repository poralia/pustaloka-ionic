import { TestBed } from '@angular/core/testing';

import { KeywordSignalService } from './keyword-signal.service';

describe('KeywordSignalService', () => {
  let service: KeywordSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeywordSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
