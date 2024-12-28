/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChicleService } from './chicle.service';

describe('Service: Chicle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChicleService]
    });
  });

  it('should ...', inject([ChicleService], (service: ChicleService) => {
    expect(service).toBeTruthy();
  }));
});
