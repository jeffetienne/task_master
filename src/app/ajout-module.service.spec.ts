import { TestBed } from '@angular/core/testing';

import { AjoutModuleService } from './ajout-module.service';

describe('AjoutModuleService', () => {
  let service: AjoutModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
