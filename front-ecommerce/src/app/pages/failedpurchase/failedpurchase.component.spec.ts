import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPurchaseComponent } from './failedpurchase.component';

describe('FailedpurchaseComponent', () => {
  let component: FailedPurchaseComponent;
  let fixture: ComponentFixture<FailedPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
