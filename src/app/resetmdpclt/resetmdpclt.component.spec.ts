import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetmdpcltComponent } from './resetmdpclt.component';

describe('ResetmdpcltComponent', () => {
  let component: ResetmdpcltComponent;
  let fixture: ComponentFixture<ResetmdpcltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetmdpcltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetmdpcltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
