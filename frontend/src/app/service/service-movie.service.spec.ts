import { TestBed } from '@angular/core/testing';

import { ServiceMovieService } from './service-movie.service';

describe('ServiceMovieService', () => {
  let service: ServiceMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
