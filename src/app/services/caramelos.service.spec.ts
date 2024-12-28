/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaramelosService } from './caramelos.service';

describe('Service: Caramelos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaramelosService]
    });
  });

  it('should ...', inject([CaramelosService], (service: CaramelosService) => {
    expect(service).toBeTruthy();
  }));
});
