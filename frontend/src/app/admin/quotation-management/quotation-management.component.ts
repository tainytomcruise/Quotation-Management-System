import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { QuotationService, Quotation } from '@app/core/services/quotation.service';
import { StatusBadgeComponent } from '@app/shared/components/status-badge/status-badge.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quotation-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    StatusBadgeComponent
  ],
  templateUrl: './quotation-management.component.html',
  styleUrls: ['./quotation-management.component.css']
})
export class QuotationManagementComponent implements OnInit {
  quotations: Quotation[] = [];
  loading = false;
  displayedColumns = ['name', 'company', 'budget', 'status', 'createdAt', 'actions'];

  constructor(
    private quotationService: QuotationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadQuotations();
  }

  loadQuotations(): void {
    this.loading = true;
    this.quotationService.getAllQuotations().subscribe({
      next: (response) => {
        this.quotations = response.quotations || [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error loading quotations', 'Close', { duration: 3000 });
      }
    });
  }

  updateStatus(quotation: Quotation, newStatus: string): void {
    if (quotation._id) {
      this.quotationService.updateQuotationStatus(quotation._id, newStatus).subscribe({
        next: () => {
          this.snackBar.open('Status updated successfully', 'Close', { duration: 3000 });
          this.loadQuotations();
        },
        error: () => {
          this.snackBar.open('Error updating status', 'Close', { duration: 3000 });
        }
      });
    }
  }

  deleteQuotation(id: string | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this quotation?')) {
      this.quotationService.deleteQuotation(id).subscribe({
        next: () => {
          this.snackBar.open('Quotation deleted successfully', 'Close', { duration: 3000 });
          this.loadQuotations();
        },
        error: () => {
          this.snackBar.open('Error deleting quotation', 'Close', { duration: 3000 });
        }
      });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  formatBudget(budget: number): string {
    return `$${budget.toLocaleString()}`;
  }
}
