/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfiteriaService } from './Confiteria.service';

describe('Service: Confiteria', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiteriaService]
    });
  });

  it('should ...', inject([ConfiteriaService], (service: ConfiteriaService) => {
    expect(service).toBeTruthy();
  }));
});
