import { TestBed } from '@angular/core/testing';

import { GenerateMatrixService } from './generate-matrix.service';

describe('GenerateCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateMatrixService = TestBed.get(GenerateMatrixService);
    expect(service).toBeTruthy();
  });
});
