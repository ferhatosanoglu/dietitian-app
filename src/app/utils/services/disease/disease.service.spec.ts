import { TestBed } from '@angular/core/testing';

import { DiseaseService } from './disease.service';

describe('DiseaseService', () => {
  let service: DiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
