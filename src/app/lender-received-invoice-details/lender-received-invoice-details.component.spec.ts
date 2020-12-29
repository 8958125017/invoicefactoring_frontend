import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderReceivedInvoiceDetailsComponent } from './lender-received-invoice-details.component';

describe('LenderReceivedInvoiceDetailsComponent', () => {
  let component: LenderReceivedInvoiceDetailsComponent;
  let fixture: ComponentFixture<LenderReceivedInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderReceivedInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderReceivedInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
