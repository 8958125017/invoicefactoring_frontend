import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisenewinvoiceComponent } from './raisenewinvoice.component';

describe('RaisenewinvoiceComponent', () => {
  let component: RaisenewinvoiceComponent;
  let fixture: ComponentFixture<RaisenewinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisenewinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisenewinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
