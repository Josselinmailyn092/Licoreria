/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChocolateService } from './chocolate.service';

describe('Service: Chocolate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChocolateService]
    });
  });

  it('should ...', inject([ChocolateService], (service: ChocolateService) => {
    expect(service).toBeTruthy();
  }));
});
