import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesspurchaseComponent } from './successpurchase.component';

describe('SuccesspurchaseComponent', () => {
  let component: SuccesspurchaseComponent;
  let fixture: ComponentFixture<SuccesspurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccesspurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesspurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
