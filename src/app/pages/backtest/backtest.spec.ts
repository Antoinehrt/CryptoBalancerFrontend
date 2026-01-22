import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Backtest } from './backtest';

describe('Backtest', () => {
  let component: Backtest;
  let fixture: ComponentFixture<Backtest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Backtest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Backtest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
