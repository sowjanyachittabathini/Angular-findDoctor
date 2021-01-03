import { TestBed, inject } from '@angular/core/testing';

import { PlanSelectService } from './planselect.service';

describe('PlanSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanSelectService]
    });
  });

  it('should be created', inject([PlanSelectService], (service: PlanSelectService) => {
    expect(service).toBeTruthy();
  }));
});
