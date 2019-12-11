import { TestBed, async, inject } from '@angular/core/testing';
import { AgencyAdminGuard } from './agency-admin.guard';

describe('AgencyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyAdminGuard]
    });
  });

  it('should ...', inject([AgencyAdminGuard], (guard: AgencyAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
