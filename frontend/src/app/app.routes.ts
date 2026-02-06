import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { QuotationListComponent } from './quotations/quotation-list/quotation-list.component';
import { QuotationFormComponent } from './quotations/quotation-form/quotation-form.component';
import { QuotationDetailComponent } from './quotations/quotation-detail/quotation-detail.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { QuotationManagementComponent } from './admin/quotation-management/quotation-management.component';
import { QuotationDetailAdminComponent } from './admin/quotation-detail/quotation-detail.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/quotations', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Customer Routes
  { 
    path: 'quotations', 
    component: QuotationListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'quotations/create', 
    component: QuotationFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'quotations/:id', 
    component: QuotationDetailComponent,
    canActivate: [AuthGuard]
  },

  // Admin Routes
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/quotations', 
    component: QuotationManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/quotations/:id', 
    component: QuotationDetailAdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  // Catch all
  { path: '**', redirectTo: '/quotations' }
];
