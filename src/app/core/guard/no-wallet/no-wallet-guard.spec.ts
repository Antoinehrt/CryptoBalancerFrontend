import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noWalletGuard } from './no-wallet-guard';

describe('noWalletGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noWalletGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
