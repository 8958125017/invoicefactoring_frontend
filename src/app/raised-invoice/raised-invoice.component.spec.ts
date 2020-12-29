import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedInvoiceComponent } from './raised-invoice.component';

describe('RaisedInvoiceComponent', () => {
  let component: RaisedInvoiceComponent;
  let fixture: ComponentFixture<RaisedInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
