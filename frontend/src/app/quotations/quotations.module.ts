import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationDetailComponent } from './quotation-detail/quotation-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuotationFormComponent,
    QuotationListComponent,
    QuotationDetailComponent
  ],
  exports: [
    QuotationFormComponent,
    QuotationListComponent,
    QuotationDetailComponent
  ]
})
export class QuotationsModule { }
