/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoTequilaService } from './productoTequila.service';

describe('Service: ProductoTequila', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoTequilaService]
    });
  });

  it('should ...', inject([ProductoTequilaService], (service: ProductoTequilaService) => {
    expect(service).toBeTruthy();
  }));
});
