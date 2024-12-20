import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingChallengeSummaryScreenComponent } from './reading-challenge-summary-screen.component';

describe('ReadingChallengeSummaryScreenComponent', () => {
  let component: ReadingChallengeSummaryScreenComponent;
  let fixture: ComponentFixture<ReadingChallengeSummaryScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingChallengeSummaryScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeSummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
