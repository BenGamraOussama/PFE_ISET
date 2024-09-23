import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucltComponent } from './menuclt.component';

describe('MenucltComponent', () => {
  let component: MenucltComponent;
  let fixture: ComponentFixture<MenucltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenucltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenucltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
