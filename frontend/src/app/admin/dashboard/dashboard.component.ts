import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: Stats | null = null;
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    const apiUrl = `${environment.apiBaseUrl}/dashboard/stats`;
    
    this.http.get<{ stats: Stats }>(apiUrl).subscribe({
      next: (response) => {
        this.stats = response.stats;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading stats', error);
      }
    });
  }
}
