import { TestBed } from '@angular/core/testing';

import { PresentServiceService } from './present-service.service';

describe('PresentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentServiceService = TestBed.get(PresentServiceService);
    expect(service).toBeTruthy();
  });
});
