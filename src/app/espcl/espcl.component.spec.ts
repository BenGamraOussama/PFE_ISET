import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspclComponent } from './espcl.component';

describe('EspclComponent', () => {
  let component: EspclComponent;
  let fixture: ComponentFixture<EspclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspclComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
