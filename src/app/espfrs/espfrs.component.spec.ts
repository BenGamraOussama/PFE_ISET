import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspfrsComponent } from './espfrs.component';

describe('EspfrsComponent', () => {
  let component: EspfrsComponent;
  let fixture: ComponentFixture<EspfrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspfrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspfrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
