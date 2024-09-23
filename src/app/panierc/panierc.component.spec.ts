import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaniercComponent } from './panierc.component';

describe('PaniercComponent', () => {
  let component: PaniercComponent;
  let fixture: ComponentFixture<PaniercComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaniercComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaniercComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
