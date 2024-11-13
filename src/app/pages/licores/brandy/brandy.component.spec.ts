import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandyComponent } from './brandy.component';

describe('BrandyComponent', () => {
  let component: BrandyComponent;
  let fixture: ComponentFixture<BrandyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
