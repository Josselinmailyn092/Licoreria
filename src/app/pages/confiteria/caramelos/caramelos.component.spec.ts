import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaramelosComponent } from './caramelos.component';

describe('CaramelosComponent', () => {
  let component: CaramelosComponent;
  let fixture: ComponentFixture<CaramelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaramelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaramelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
