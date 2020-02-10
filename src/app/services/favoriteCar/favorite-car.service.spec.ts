import { TestBed } from '@angular/core/testing';

import { FavoriteCarService } from './favorite-car.service';

describe('FavoriteCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteCarService = TestBed.get(FavoriteCarService);
    expect(service).toBeTruthy();
  });
});
