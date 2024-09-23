import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLivreurComponent } from './login-livreur.component';

describe('LoginLivreurComponent', () => {
  let component: LoginLivreurComponent;
  let fixture: ComponentFixture<LoginLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLivreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
