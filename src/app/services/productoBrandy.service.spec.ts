/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoBrandyService } from './productoBrandy.service';

describe('Service: ProductoBrandy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoBrandyService]
    });
  });

  it('should ...', inject([ProductoBrandyService], (service: ProductoBrandyService) => {
    expect(service).toBeTruthy();
  }));
});
