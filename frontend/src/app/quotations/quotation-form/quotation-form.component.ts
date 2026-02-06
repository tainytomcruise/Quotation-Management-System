import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { QuotationService } from '@app/core/services/quotation.service';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.css']
})
export class QuotationFormComponent {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private quotationService: QuotationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      requirementDescription: ['', [Validators.required, Validators.minLength(10)]],
      budget: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.quotationService.createQuotation(this.form.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('Quotation submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/quotations']);
      },
      error: (error) => {
        this.loading = false;
        const message = error.error?.errors?.[0] || error.error?.message || 'Failed to submit';
        this.snackBar.open(message, 'Close', { duration: 3000 });
      }
    });
  }
}
