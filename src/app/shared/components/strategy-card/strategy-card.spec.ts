import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyCard } from './strategy-card';

describe('StrategyCard', () => {
  let component: StrategyCard;
  let fixture: ComponentFixture<StrategyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
