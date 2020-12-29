import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RaisenewinvoiceComponent } from '../../raisenewinvoice/raisenewinvoice.component';
import { InvoiceReceivedComponent } from '../../invoice-received/invoice-received.component';
import { ReceivedInvoiceComponent } from '../../received-invoice/received-invoice.component';
import { RaisedInvoiceComponent } from '../../raised-invoice/raised-invoice.component';
import { RaisedInvoiceDetailsComponent } from '../../raised-invoice-details/raised-invoice-details.component';
import { LenderReceivedInvoiceDetailsComponent } from '../../lender-received-invoice-details/lender-received-invoice-details.component';
import { AuthGuardService}from'../../auth-guard.service';
import { LenderDashboardComponent } from '../../lender-dashboard/lender-dashboard.component';

export const AdminLayoutRoutes: Routes = [
 
    { path: 'dashboard',                           component: DashboardComponent},
    { path: 'lenderDashboard',                     component: LenderDashboardComponent},
    { path: 'Raise_New_Invoice',                   component: RaisenewinvoiceComponent},
    { path: 'Invoice_Reveived_Details/:invoiceId', component: InvoiceReceivedComponent},
    { path: 'Receive_Invoice_Details/:invoiceId',   component: RaisedInvoiceDetailsComponent},
    { path: 'Received_Invoice_Details/:invoiceId', component: LenderReceivedInvoiceDetailsComponent},
    { path: 'Received_Invoice',                    component: ReceivedInvoiceComponent},
    { path: 'Raised_Invoice',                      component: RaisedInvoiceComponent}
];
