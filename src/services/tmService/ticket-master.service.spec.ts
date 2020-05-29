import { TestBed } from '@angular/core/testing';

import { TicketMasterService } from './ticket-master.service';

describe('TicketMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketMasterService = TestBed.get(TicketMasterService);
    expect(service).toBeTruthy();
  });
});
