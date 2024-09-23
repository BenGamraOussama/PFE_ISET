import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterfournisseurComponent } from './registerfournisseur.component';

describe('RegisterfournisseurComponent', () => {
  let component: RegisterfournisseurComponent;
  let fixture: ComponentFixture<RegisterfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterfournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
