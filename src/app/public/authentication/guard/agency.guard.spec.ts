import { TestBed, async, inject } from '@angular/core/testing';

import { AgencyGuard } from './agency.guard';

describe('AgencyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyGuard]
    });
  });

  it('should ...', inject([AgencyGuard], (guard: AgencyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
