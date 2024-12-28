/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FuncionesService } from './Funciones.service';

describe('Service: Funciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionesService]
    });
  });

  it('should ...', inject([FuncionesService], (service: FuncionesService) => {
    expect(service).toBeTruthy();
  }));
});
