import { TestBed } from '@angular/core/testing';

import { EmpserviceService } from './empservice.service';

describe('EmpserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpserviceService = TestBed.get(EmpserviceService);
    expect(service).toBeTruthy();
  });
});
