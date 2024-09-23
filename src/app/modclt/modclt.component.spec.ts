import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModcltComponent } from './modclt.component';

describe('ModcltComponent', () => {
  let component: ModcltComponent;
  let fixture: ComponentFixture<ModcltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModcltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModcltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
