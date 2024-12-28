/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnaksService } from './snaks.service';

describe('Service: Snaks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnaksService]
    });
  });

  it('should ...', inject([SnaksService], (service: SnaksService) => {
    expect(service).toBeTruthy();
  }));
});
