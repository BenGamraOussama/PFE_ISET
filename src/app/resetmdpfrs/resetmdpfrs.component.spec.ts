import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetmdpfrsComponent } from './resetmdpfrs.component';

describe('ResetmdpfrsComponent', () => {
  let component: ResetmdpfrsComponent;
  let fixture: ComponentFixture<ResetmdpfrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetmdpfrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetmdpfrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
