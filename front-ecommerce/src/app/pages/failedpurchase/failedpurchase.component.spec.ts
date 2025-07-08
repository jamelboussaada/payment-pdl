import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedpurchaseComponent } from './failedpurchase.component';

describe('FailedpurchaseComponent', () => {
  let component: FailedpurchaseComponent;
  let fixture: ComponentFixture<FailedpurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedpurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
