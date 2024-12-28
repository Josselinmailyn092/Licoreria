/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoGinService } from './productoGin.service';

describe('Service: ProductoGin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoGinService]
    });
  });

  it('should ...', inject([ProductoGinService], (service: ProductoGinService) => {
    expect(service).toBeTruthy();
  }));
});
