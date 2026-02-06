import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationManagementComponent } from './quotation-management/quotation-management.component';
import { QuotationDetailAdminComponent } from './quotation-detail/quotation-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    QuotationManagementComponent,
    QuotationDetailAdminComponent
  ],
  exports: [
    DashboardComponent,
    QuotationManagementComponent,
    QuotationDetailAdminComponent
  ]
})
export class AdminModule { }
