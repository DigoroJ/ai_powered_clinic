import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { PatientLayoutComponent } from './core/layout/patient-layout/patient-layout.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './features/patient/patient-dashboard/patient-dashboard.component';
import { BookAppointmentComponent } from './features/patient/book-appointment/book-appointment.component';
import { SelectDoctorComponent } from './features/patient/select-doctor/select-doctor.component';
import { AppointmentDateTimeComponent } from './features/patient/appointment-date-time/appointment-date-time.component';
import { ReviewAppointmentComponent } from './features/patient/appointment-review/appointment-review.component';
import { AppointmentConfirmedComponent } from './features/patient/appointment-confirmed/appointment-confirmed.component';
import { SymptomCheckerComponent } from './features/patient/symptom-checker/symptom-checker.component';
import { SymptomResultComponent } from './features/patient/symptom-result/symptom-result.component';
import { PatientsComponent } from './features/patients/patients/patients.component';
import { DoctorsComponent } from './features/doctors/doctors/doctors.component';
import { NursesComponent } from './features/nurses/nurses/nurses.component';
import { AppointmentsComponent } from './features/appointments/appointments/appointments.component';
import { MedicalRecordsComponent } from './features/records/medical-records/medical-records.component';
import { AiAnalyticsComponent } from './features/ai/ai-analytics/ai-analytics.component';
import { AiTriageComponent } from './features/ai/ai-triage/ai-triage.component';
import { DatasetEdaComponent } from './features/ai/dataset-eda/dataset-eda.component';
import { ReportsComponent } from './features/report/reports/reports.component';
import { SettingsComponent } from './features/settings/settings/settings.component';




const routes: Routes = [

  // =====================================================
  // DEFAULT
  // =====================================================

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },


  // =====================================================
  // ADMIN APPLICATION
  // =====================================================

  {
    path: '',
    component: MainLayoutComponent,

    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'patients',
        component: PatientsComponent
      },
      {
        path: 'doctors',
        component: DoctorsComponent
      },
      {
        path: 'nurses',
        component: NursesComponent
      },
      {
        path: 'appointments',
        component: AppointmentsComponent
      },
      {
        path: 'medical-records',
        component: MedicalRecordsComponent
      },
      {
        path: 'ai-triage',
        component: AiTriageComponent
      },
      {
        path: 'ai-analytics',
        component: AiAnalyticsComponent
      },
      {
        path: 'dataset-eda',
        component: DatasetEdaComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }

    ]
  },


  // =====================================================
  // PATIENT APPLICATION
  // =====================================================

  {
  path: 'patient',
  component: PatientLayoutComponent,

  children: [
    {
      path: 'dashboard',
      component: PatientDashboardComponent
    },
    {
      path: 'book-appointment',
      component: BookAppointmentComponent
    },
    {
      path: 'select-doctor',
      component: SelectDoctorComponent
    },
    {
      path: 'appointment-date-time',
      component: AppointmentDateTimeComponent
    },
    {
      path: 'appointment-review',
      component: ReviewAppointmentComponent
    },
    {
      path: 'appointment-confirmed',
      component: AppointmentConfirmedComponent
    },
    {
      path: 'symptom-checker',
      component: SymptomCheckerComponent
    },
    {
      path: 'symptom-result',
      component: SymptomResultComponent
    }

  ]
}

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
