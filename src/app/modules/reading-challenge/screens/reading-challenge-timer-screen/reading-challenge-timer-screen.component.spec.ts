import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingChallengeTimerScreenComponent } from './reading-challenge-timer-screen.component';

describe('ReadingChallengeTimerScreenComponent', () => {
  let component: ReadingChallengeTimerScreenComponent;
  let fixture: ComponentFixture<ReadingChallengeTimerScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingChallengeTimerScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeTimerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
