import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingChallengePage } from './reading-challenge.page';

describe('ReadingChallengePage', () => {
  let component: ReadingChallengePage;
  let fixture: ComponentFixture<ReadingChallengePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingChallengePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingChallengePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
