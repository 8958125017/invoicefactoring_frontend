import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RaisenewinvoiceComponent } from '../../raisenewinvoice/raisenewinvoice.component';
import { InvoiceReceivedComponent } from '../../invoice-received/invoice-received.component';
import { ReceivedInvoiceComponent } from '../../received-invoice/received-invoice.component';
import { RaisedInvoiceComponent } from '../../raised-invoice/raised-invoice.component';
import { RaisedInvoiceDetailsComponent } from '../../raised-invoice-details/raised-invoice-details.component';
import { LenderReceivedInvoiceDetailsComponent } from '../../lender-received-invoice-details/lender-received-invoice-details.component';
import { LenderDashboardComponent } from '../../lender-dashboard/lender-dashboard.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    LenderDashboardComponent,
    InvoiceReceivedComponent,
    RaisenewinvoiceComponent,
    ReceivedInvoiceComponent,
    RaisedInvoiceComponent,
    RaisedInvoiceDetailsComponent,
    LenderReceivedInvoiceDetailsComponent
  ]
})

export class AdminLayoutModule {}
