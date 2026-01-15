import { TestBed } from '@angular/core/testing';

import { BacktestCalculationService } from './backtest-calculation.service';

describe('BacktestCalculationService', () => {
  let service: BacktestCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacktestCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
