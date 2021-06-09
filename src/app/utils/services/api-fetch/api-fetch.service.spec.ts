import { TestBed } from '@angular/core/testing';

import { ApiFetchService } from './api-fetch.service';

describe('ApiFetchService', () => {
  let service: ApiFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
