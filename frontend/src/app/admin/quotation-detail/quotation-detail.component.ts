import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { QuotationService, Quotation } from '@app/core/services/quotation.service';
import { StatusBadgeComponent } from '@app/shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-quotation-detail-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    StatusBadgeComponent
  ],
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailAdminComponent implements OnInit {
  quotation: Quotation | null = null;
  loading = false;
  selectedStatus: string = 'Pending';

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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
        this.selectedStatus = this.quotation?.status || 'Pending';
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error loading quotation', 'Close', { duration: 3000 });
      }
    });
  }

  updateStatus(): void {
    if (this.quotation?._id) {
      this.quotationService.updateQuotationStatus(this.quotation._id, this.selectedStatus).subscribe({
        next: () => {
          this.snackBar.open('Status updated successfully', 'Close', { duration: 3000 });
          if (this.quotation) {
            this.quotation.status = this.selectedStatus as 'Pending' | 'Approved' | 'Rejected';
          }
        },
        error: () => {
          this.snackBar.open('Error updating status', 'Close', { duration: 3000 });
        }
      });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  formatBudget(budget: number): string {
    return `$${budget.toLocaleString()}`;
  }
}
