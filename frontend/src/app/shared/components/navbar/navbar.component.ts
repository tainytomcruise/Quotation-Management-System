import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span class="logo">Quotation Management</span>
      <span class="spacer"></span>
      
      <div *ngIf="currentUser$ | async as user" class="user-menu">
        <button mat-button [matMenuTriggerFor]="menu">
          <mat-icon>account_circle</mat-icon>
          <span class="user-name">{{ user.name }}</span>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item *ngIf="user.role === 'Admin'" routerLink="/admin/dashboard">Dashboard</button>
          <button mat-menu-item routerLink="/quotations">Quotations</button>
          <button mat-menu-item (click)="logout()">Logout</button>
        </mat-menu>
      </div>
      
      <div *ngIf="!(currentUser$ | async)" class="auth-buttons">
        <button mat-button routerLink="/login">Login</button>
        <button mat-button routerLink="/register">Register</button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      display: block;
    }
    mat-toolbar {
      position: sticky !important;
      top: 0 !important;
      z-index: 100 !important;
      padding: 0 24px !important;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      font-size: 20px;
      font-weight: 600;
      white-space: nowrap;
    }
    .user-menu {
      display: flex;
      align-items: center;
      margin-left: 16px;
      white-space: nowrap;
    }
    .user-menu button {
      padding: 0 12px !important;
    }
    .user-name {
      margin-left: 8px;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .auth-buttons {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-left: 16px;
      white-space: nowrap;
    }
    .auth-buttons button {
      padding: 8px 16px !important;
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.authService.getMe().subscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
