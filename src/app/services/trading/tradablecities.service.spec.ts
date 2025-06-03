import { TestBed } from '@angular/core/testing';

import { TradablecitiesService } from './tradablecities.service';

describe('TradablecitiesService', () => {
  let service: TradablecitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradablecitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
