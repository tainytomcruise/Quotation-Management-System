import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuotationService, Quotation } from '@app/core/services/quotation.service';
import { StatusBadgeComponent } from '@app/shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StatusBadgeComponent
  ],
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent implements OnInit {
  quotations: Quotation[] = [];
  loading = false;
  displayedColumns = ['name', 'company', 'budget', 'status', 'createdAt', 'actions'];

  constructor(private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.loadQuotations();
  }

  loadQuotations(): void {
    this.loading = true;
    this.quotationService.getMyQuotations().subscribe({
      next: (response) => {
        this.quotations = response.quotations || [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading quotations', error);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  formatBudget(budget: number): string {
    return `$${budget.toLocaleString()}`;
  }
}
