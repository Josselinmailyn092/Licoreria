/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoVinosService } from './productoVinos.service';

describe('Service: ProductoVinos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoVinosService]
    });
  });

  it('should ...', inject([ProductoVinosService], (service: ProductoVinosService) => {
    expect(service).toBeTruthy();
  }));
});
