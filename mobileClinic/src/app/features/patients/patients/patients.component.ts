import { Component } from '@angular/core';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  status: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  searchTerm = '';
  selectedStatus = 'All';

  patients: Patient[] = [
    {
      id: 'P001',
      name: 'Thabo Mokoena',
      age: 34,
      gender: 'Male',
      phone: '071 234 5678',
      lastVisit: '10 Sep 2026',
      status: 'Active'
    },
    {
      id: 'P002',
      name: 'Lerato Molefe',
      age: 28,
      gender: 'Female',
      phone: '072 456 7890',
      lastVisit: '09 Sep 2026',
      status: 'Active'
    },
    {
      id: 'P003',
      name: 'Kagiso Ndlovu',
      age: 52,
      gender: 'Male',
      phone: '083 123 4567',
      lastVisit: '05 Sep 2026',
      status: 'Follow-up'
    },
    {
      id: 'P004',
      name: 'Naledi Dlamini',
      age: 19,
      gender: 'Female',
      phone: '076 987 6543',
      lastVisit: '01 Sep 2026',
      status: 'Active'
    }
  ];

  get filteredPatients(): Patient[] {
    const search = this.searchTerm.toLowerCase().trim();

    return this.patients.filter(patient => {
      const matchesSearch =
        !search ||
        patient.name.toLowerCase().includes(search) ||
        patient.id.toLowerCase().includes(search) ||
        patient.phone.includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        patient.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
}