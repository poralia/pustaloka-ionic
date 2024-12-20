import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingChallengeEditorScreenComponent } from './reading-challenge-editor-screen.component';

describe('ReadingChallengeEditorScreenComponent', () => {
  let component: ReadingChallengeEditorScreenComponent;
  let fixture: ComponentFixture<ReadingChallengeEditorScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingChallengeEditorScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeEditorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
