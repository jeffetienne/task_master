import { TestBed } from '@angular/core/testing';

import { LogModificationService } from './log-modification.service';

describe('LogModificationService', () => {
  let service: LogModificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogModificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
