import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChupetesComponent } from './chupetes.component';

describe('ChupetesComponent', () => {
  let component: ChupetesComponent;
  let fixture: ComponentFixture<ChupetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChupetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChupetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
