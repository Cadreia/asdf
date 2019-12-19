import { TestBed } from '@angular/core/testing';

import { AgencyUsersResolverService } from './agency-users-resolver.service';

describe('AgencyUsersResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgencyUsersResolverService = TestBed.get(AgencyUsersResolverService);
    expect(service).toBeTruthy();
  });
});
