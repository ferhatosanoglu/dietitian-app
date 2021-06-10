import { TestBed } from '@angular/core/testing';

import { DietService } from './diet.service';

describe('DietService', () => {
  let service: DietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
