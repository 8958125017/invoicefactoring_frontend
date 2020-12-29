import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReceivedComponent } from './invoice-received.component';

describe('InvoiceReceivedComponent', () => {
  let component: InvoiceReceivedComponent;
  let fixture: ComponentFixture<InvoiceReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
