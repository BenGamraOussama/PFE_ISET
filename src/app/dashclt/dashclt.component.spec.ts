import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashcltComponent } from './dashclt.component';

describe('DashcltComponent', () => {
  let component: DashcltComponent;
  let fixture: ComponentFixture<DashcltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashcltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashcltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
