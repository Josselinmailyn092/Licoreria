/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoVodkaService } from './productoVodka.service';

describe('Service: ProductoVodka', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoVodkaService]
    });
  });

  it('should ...', inject([ProductoVodkaService], (service: ProductoVodkaService) => {
    expect(service).toBeTruthy();
  }));
});
