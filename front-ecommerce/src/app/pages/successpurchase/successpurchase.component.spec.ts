import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPurchaseComponent } from './successpurchase.component';

describe('SuccesspurchaseComponent', () => {
  let component: SuccessPurchaseComponent;
  let fixture: ComponentFixture<SuccessPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
