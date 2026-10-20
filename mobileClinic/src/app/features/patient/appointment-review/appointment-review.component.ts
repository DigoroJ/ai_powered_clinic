import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-review',
  templateUrl: './appointment-review.component.html',
  styleUrls: ['./appointment-review.component.scss']
})
export class ReviewAppointmentComponent implements OnInit {

  appointment = {
    service: '',
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    serviceId: null as number | null,
    doctorId: null as number | null
  };

  errorMessage = '';

  constructor(
    private router: Router,
    private location: Location,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const savedAppointment = this.appointmentService.getAppointment();

    this.appointment = {
      ...savedAppointment
    };

    // Display the date in a readable format.
    if (this.appointment.date) {
      const parts = this.appointment.date.split('-');

      if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);

        const date = new Date(year, month - 1, day);

        this.appointment.date = date.toLocaleDateString('en-ZA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    }

    if (
      !this.appointment.service ||
      !this.appointment.doctor ||
      !savedAppointment.date ||
      !this.appointment.time
    ) {
      this.errorMessage =
        'Your appointment details are incomplete. Please return to the booking steps and complete your selection.';
    }
  }

  goBack(): void {
    this.location.back();
  }

  confirmAppointment(): void {
    const savedAppointment = this.appointmentService.getAppointment();
    console.log('test', savedAppointment);
    if (
      !savedAppointment.service ||
      !savedAppointment.doctor ||
      !savedAppointment.date ||
      !savedAppointment.time
    ) {
      this.errorMessage =
        'Please select a service, doctor, date and time before confirming.';
      return;
    }

    if (
      !savedAppointment.serviceId ||
      !savedAppointment.doctorId
    ) {
      this.errorMessage =
        'The service or doctor ID is missing. Please return to the selection steps and select them again.';
      return;
    }

    // The backend booking request will be added here
    // after connecting your API service and patient authentication.
    this.errorMessage =
      'Your selections are ready. The booking API and authenticated patient ID must be connected before this appointment can be confirmed.';
  }
  
  
}