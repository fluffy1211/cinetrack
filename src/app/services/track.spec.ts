import { TestBed } from '@angular/core/testing';

import { TrackService as Track } from './track.service';

describe('Track', () => {
  let service: Track;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Track);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
