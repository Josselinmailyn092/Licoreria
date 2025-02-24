import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosComponenteComponent } from './filtros-componente.component';

describe('FiltrosComponenteComponent', () => {
  let component: FiltrosComponenteComponent;
  let fixture: ComponentFixture<FiltrosComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltrosComponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
