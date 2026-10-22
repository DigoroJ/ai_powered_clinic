import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClinicDashboardComponent } from './clinic-dashboard/clinic-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ClinicDashboardComponent,
    NurseDashboardComponent,
    DoctorDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    AdminDashboardComponent,
    ClinicDashboardComponent
  ]
})
export class DashboardModule {}