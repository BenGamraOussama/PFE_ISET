import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierlComponent } from './panierl.component';

describe('PanierlComponent', () => {
  let component: PanierlComponent;
  let fixture: ComponentFixture<PanierlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
