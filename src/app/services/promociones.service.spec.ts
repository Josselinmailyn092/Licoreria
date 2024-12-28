/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PromocionesService } from './promociones.service';

describe('Service: Promociones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocionesService]
    });
  });

  it('should ...', inject([PromocionesService], (service: PromocionesService) => {
    expect(service).toBeTruthy();
  }));
});
