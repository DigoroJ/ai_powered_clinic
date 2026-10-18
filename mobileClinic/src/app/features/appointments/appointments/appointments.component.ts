import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  selectedStatus = 'All';

  appointments = [
    {
      patient: 'Thabo Mokoena',
      doctor: 'Dr Nomsa Dlamini',
      service: 'General Consultation',
      date: '12 Sep 2026',
      time: '09:00',
      status: 'Confirmed'
    },
    {
      patient: 'Lerato Molefe',
      doctor: 'Dr Lerato Molefe',
      service: 'Pediatrics',
      date: '12 Sep 2026',
      time: '09:30',
      status: 'Pending'
    },
    {
      patient: 'Kagiso Ndlovu',
      doctor: 'Dr Thabo Mokoena',
      service: 'Chronic Disease',
      date: '12 Sep 2026',
      time: '10:00',
      status: 'Confirmed'
    },
    {
      patient: 'Naledi Dlamini',
      doctor: 'Dr Naledi Khumalo',
      service: "Women's Health",
      date: '12 Sep 2026',
      time: '10:30',
      status: 'Cancelled'
    }
  ];

  get filteredAppointments() {
    if (this.selectedStatus === 'All') {
      return this.appointments;
    }

    return this.appointments.filter(
      appointment => appointment.status === this.selectedStatus
    );
  }
}