import { TestBed } from '@angular/core/testing';

import { KentekenService } from './kenteken.service';

describe('KentekenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KentekenService = TestBed.get(KentekenService);
    expect(service).toBeTruthy();
  });
});
