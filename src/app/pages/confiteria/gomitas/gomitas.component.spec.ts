import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GomitasComponent } from './gomitas.component';

describe('GomitasComponent', () => {
  let component: GomitasComponent;
  let fixture: ComponentFixture<GomitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GomitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GomitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
