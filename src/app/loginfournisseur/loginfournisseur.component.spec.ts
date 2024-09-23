import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfournisseurComponent } from './loginfournisseur.component';

describe('LoginfournisseurComponent', () => {
  let component: LoginfournisseurComponent;
  let fixture: ComponentFixture<LoginfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginfournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
