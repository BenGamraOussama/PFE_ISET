import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModfrsComponent } from './modfrs.component';

describe('ModfrsComponent', () => {
  let component: ModfrsComponent;
  let fixture: ComponentFixture<ModfrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModfrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModfrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
