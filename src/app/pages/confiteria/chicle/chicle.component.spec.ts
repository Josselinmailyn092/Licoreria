import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChicleComponent } from './chicle.component';

describe('ChicleComponent', () => {
  let component: ChicleComponent;
  let fixture: ComponentFixture<ChicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
