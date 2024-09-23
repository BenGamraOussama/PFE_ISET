import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulivComponent } from './menuliv.component';

describe('MenulivComponent', () => {
  let component: MenulivComponent;
  let fixture: ComponentFixture<MenulivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenulivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenulivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
