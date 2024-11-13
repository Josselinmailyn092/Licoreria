import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiteriaComponent } from './confiteria.component';

describe('ConfiteriaComponent', () => {
  let component: ConfiteriaComponent;
  let fixture: ComponentFixture<ConfiteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
