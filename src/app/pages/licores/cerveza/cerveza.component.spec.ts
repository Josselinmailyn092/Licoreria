import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CervezaComponent } from './cerveza.component';

describe('CervezaComponent', () => {
  let component: CervezaComponent;
  let fixture: ComponentFixture<CervezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CervezaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CervezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
