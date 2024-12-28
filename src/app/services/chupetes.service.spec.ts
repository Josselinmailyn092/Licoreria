/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChupetesService } from './chupetes.service';

describe('Service: Chupetes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChupetesService]
    });
  });

  it('should ...', inject([ChupetesService], (service: ChupetesService) => {
    expect(service).toBeTruthy();
  }));
});
