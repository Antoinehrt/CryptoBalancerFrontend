import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WalletCreation} from './wallet-creation';

describe('WalletCreation', () => {
  let component: WalletCreation;
  let fixture: ComponentFixture<WalletCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
