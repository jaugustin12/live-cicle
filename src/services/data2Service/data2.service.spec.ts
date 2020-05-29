import { TestBed } from '@angular/core/testing';

import { Data2Service } from './data2.service';

describe('Data2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Data2Service = TestBed.get(Data2Service);
    expect(service).toBeTruthy();
  });
});
