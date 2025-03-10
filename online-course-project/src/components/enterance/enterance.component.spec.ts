import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteranceComponent } from './enterance.component';

describe('EnteranceComponent', () => {
  let component: EnteranceComponent;
  let fixture: ComponentFixture<EnteranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnteranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnteranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
