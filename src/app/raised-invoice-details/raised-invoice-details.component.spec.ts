import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedInvoiceDetailsComponent } from './raised-invoice-details.component';

describe('RaisedInvoiceDetailsComponent', () => {
  let component: RaisedInvoiceDetailsComponent;
  let fixture: ComponentFixture<RaisedInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
