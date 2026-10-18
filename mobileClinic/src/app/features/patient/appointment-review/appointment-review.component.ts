import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-review',
  templateUrl: './appointment-review.component.html',
  styleUrls: ['./appointment-review.component.scss']
})
export class ReviewAppointmentComponent implements OnInit {

  appointment = {
    service: 'General Consultation',
    doctor: 'Dr Nomsa Dlamini',
    date: '15 August 2026',
    time: '10:00 AM'
  };

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Appointment data will later be loaded
    // from the booking journey or backend.
  }

  /**
   * Go back to the previous booking step.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Confirm the appointment and continue
   * to the confirmation screen.
   */
  confirmAppointment(): void {

    console.log(
      'Appointment confirmed:',
      this.appointment
    );

    this.router.navigate([
      '/patient/appointment-confirmed'
    ]);
  }

}