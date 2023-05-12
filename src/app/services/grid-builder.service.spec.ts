import { TestBed } from '@angular/core/testing';

import { GridBuilderService } from './grid-builder.service';

describe('GridBuilderService', () => {
  let service: GridBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
