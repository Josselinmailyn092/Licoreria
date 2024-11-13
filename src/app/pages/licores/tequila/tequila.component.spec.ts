import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TequilaComponent } from './tequila.component';

describe('TequilaComponent', () => {
  let component: TequilaComponent;
  let fixture: ComponentFixture<TequilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TequilaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TequilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
