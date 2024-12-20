import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingChallengeDetailScreenComponent } from './reading-challenge-detail-screen.component';

describe('ReadingChallengeDetailScreenComponent', () => {
  let component: ReadingChallengeDetailScreenComponent;
  let fixture: ComponentFixture<ReadingChallengeDetailScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingChallengeDetailScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
