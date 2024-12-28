/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GomitasService } from './gomitas.service';

describe('Service: Gomitas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GomitasService]
    });
  });

  it('should ...', inject([GomitasService], (service: GomitasService) => {
    expect(service).toBeTruthy();
  }));
});
