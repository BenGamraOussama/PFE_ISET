import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcolisComponent } from './listcolis.component';

describe('ListcolisComponent', () => {
  let component: ListcolisComponent;
  let fixture: ComponentFixture<ListcolisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcolisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
