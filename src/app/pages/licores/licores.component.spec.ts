import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicoresComponent } from './licores.component';

describe('LicoresComponent', () => {
  let component: LicoresComponent;
  let fixture: ComponentFixture<LicoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LicoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
