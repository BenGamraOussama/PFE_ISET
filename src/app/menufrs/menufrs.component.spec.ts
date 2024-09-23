import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenufrsComponent } from './menufrs.component';

describe('MenufrsComponent', () => {
  let component: MenufrsComponent;
  let fixture: ComponentFixture<MenufrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenufrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenufrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
