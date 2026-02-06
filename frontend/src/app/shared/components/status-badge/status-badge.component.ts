import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  template: `
    <mat-chip [ngClass]="'status-' + (status | lowercase)">
      {{ status }}
    </mat-chip>
  `,
  styles: [`
    .status-pending {
      background-color: #ff9800 !important;
      color: white !important;
    }
    .status-approved {
      background-color: #4caf50 !important;
      color: white !important;
    }
    .status-rejected {
      background-color: #f44336 !important;
      color: white !important;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = 'Pending';
}
