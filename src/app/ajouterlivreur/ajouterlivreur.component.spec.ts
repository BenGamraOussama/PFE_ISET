import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterlivreurComponent } from './ajouterlivreur.component';

describe('AjouterlivreurComponent', () => {
  let component: AjouterlivreurComponent;
  let fixture: ComponentFixture<AjouterlivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterlivreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterlivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
