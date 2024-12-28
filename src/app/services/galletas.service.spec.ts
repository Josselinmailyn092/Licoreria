/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GalletasService } from './galletas.service';

describe('Service: Galletas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalletasService]
    });
  });

  it('should ...', inject([GalletasService], (service: GalletasService) => {
    expect(service).toBeTruthy();
  }));
});
