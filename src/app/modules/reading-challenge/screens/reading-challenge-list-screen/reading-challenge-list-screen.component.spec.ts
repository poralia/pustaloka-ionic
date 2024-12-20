import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingChallengeListScreenComponent } from './reading-challenge-list-screen.component';

describe('ReadingChallengeListScreenComponent', () => {
  let component: ReadingChallengeListScreenComponent;
  let fixture: ComponentFixture<ReadingChallengeListScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingChallengeListScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
