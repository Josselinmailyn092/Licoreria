/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoCervezaService } from './productoCerveza.service';

describe('Service: ProductoCerveza', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoCervezaService]
    });
  });

  it('should ...', inject([ProductoCervezaService], (service: ProductoCervezaService) => {
    expect(service).toBeTruthy();
  }));
});
