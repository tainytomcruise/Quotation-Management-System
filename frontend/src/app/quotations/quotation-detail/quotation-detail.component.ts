import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { QuotationService, Quotation } from '@app/core/services/quotation.service';
import { StatusBadgeComponent } from '@app/shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-quotation-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    StatusBadgeComponent
  ],
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailComponent implements OnInit {
  quotation: Quotation | null = null;
  loading = false;

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadQuotation(id);
    }
  }

  loadQuotation(id: string): void {
    this.loading = true;
    this.quotationService.getQuotation(id).subscribe({
      next: (response) => {
        this.quotation = response.quotation;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading quotation', error);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  formatBudget(budget: number): string {
    return `$${budget.toLocaleString()}`;
  }
}
