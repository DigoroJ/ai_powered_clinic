import { Component, OnInit } from '@angular/core';

interface Appointment {
  patient: string;
  doctor: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  statistics = {
    patients: 1250,
    doctors: 24,
    nurses: 120,
    appointments: 545
  };

  appointments: Appointment[] = [
    {
      patient: 'John Doe',
      doctor: 'Dr Smith',
      date: '12/07',
      status: 'Completed'
    },
    {
      patient: 'Rihanna Provence',
      doctor: 'Dr Digoro',
      date: '13/07',
      status: 'Completed'
    },
    {
      patient: 'Jane Doe',
      doctor: 'Dr Chauke',
      date: '14/07',
      status: 'Pending'
    },
    {
      patient: 'Lissa Smith',
      doctor: 'Dr Lucas',
      date: '15/07',
      status: 'Pending'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

}