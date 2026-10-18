import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentBookingComponent,
    AppointmentDetailsComponent,
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AppointmentsModule { }
