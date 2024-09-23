import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModlivComponent } from './modliv.component';

describe('ModlivComponent', () => {
  let component: ModlivComponent;
  let fixture: ComponentFixture<ModlivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModlivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModlivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
