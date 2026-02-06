import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    StatusBadgeComponent
  ],
  exports: [
    NavbarComponent,
    StatusBadgeComponent
  ]
})
export class SharedModule { }
