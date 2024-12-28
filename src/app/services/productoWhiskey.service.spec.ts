/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoWhiskeyService } from './productoWhiskey.service';

describe('Service: ProductoWhiskey', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoWhiskeyService]
    });
  });

  it('should ...', inject([ProductoWhiskeyService], (service: ProductoWhiskeyService) => {
    expect(service).toBeTruthy();
  }));
});
