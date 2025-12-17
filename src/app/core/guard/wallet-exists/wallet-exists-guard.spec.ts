import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { walletExistsGuard } from './wallet-exists-guard';

describe('walletExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => walletExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
