import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationCommandeComponent } from './affectation-commande.component';

describe('AffectationCommandeComponent', () => {
  let component: AffectationCommandeComponent;
  let fixture: ComponentFixture<AffectationCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
