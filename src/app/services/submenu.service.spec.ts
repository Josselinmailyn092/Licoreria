/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubmenuService } from './submenu.service';

describe('Service: Submenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmenuService]
    });
  });

  it('should ...', inject([SubmenuService], (service: SubmenuService) => {
    expect(service).toBeTruthy();
  }));
});
