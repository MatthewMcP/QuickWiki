import { TestBed, inject } from '@angular/core/testing';

import { WikiDataService } from './wiki-data.service';

describe('WikiDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikiDataService]
    });
  });

  it('should be created', inject([WikiDataService], (service: WikiDataService) => {
    expect(service).toBeTruthy();
  }));
});
