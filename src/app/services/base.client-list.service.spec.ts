import { TestBed } from '@angular/core/testing';

import { BaseClientListService } from './base.client-list.service';

describe('BaseClientListService', () => {
  let service: BaseClientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseClientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
