import { TestBed } from '@angular/core/testing';

import { DummyHttpClientService } from './dummy-http-client.service';

describe('DummyHttpClientService', () => {
  let service: DummyHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
