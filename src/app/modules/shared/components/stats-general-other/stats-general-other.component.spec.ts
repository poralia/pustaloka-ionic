import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatsGeneralComponentOther } from './stats-general-other.component';

describe('StatsGeneralComponent', () => {
  let component: StatsGeneralComponentOther;
  let fixture: ComponentFixture<StatsGeneralComponentOther>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsGeneralComponentOther ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsGeneralComponentOther);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
