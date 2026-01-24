import {beforeEach, describe, it} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {Header} from './header';
import {PageTitleService} from '../../../core/services/page-title/page-title.service';
import {provideNoopAnimations} from '@angular/platform-browser/animations';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [PageTitleService, provideNoopAnimations()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;
  });
});

