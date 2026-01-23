import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetForm } from './add-asset-form';

describe('AddAssetForm', () => {
  let component: AddAssetForm;
  let fixture: ComponentFixture<AddAssetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssetForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
