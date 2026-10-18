import { Component } from '@angular/core';

interface Doctor {
  name: string;
  specialty: string;
  phone: string;
  patients: number;
  status: string;
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {

  searchTerm = '';

  doctors: Doctor[] = [
    {
      name: 'Dr Nomsa Dlamini',
      specialty: 'General Practitioner',
      phone: '071 222 3344',
      patients: 124,
      status: 'Available'
    },
    {
      name: 'Dr Thabo Mokoena',
      specialty: 'General Practitioner',
      phone: '072 555 6677',
      patients: 98,
      status: 'Available'
    },
    {
      name: 'Dr Lerato Molefe',
      specialty: 'Pediatrician',
      phone: '083 444 5566',
      patients: 87,
      status: 'Busy'
    },
    {
      name: 'Dr Naledi Khumalo',
      specialty: "Women's Health",
      phone: '076 777 8899',
      patients: 76,
      status: 'Available'
    }
  ];

  get filteredDoctors(): Doctor[] {
    const search = this.searchTerm.toLowerCase().trim();

    return this.doctors.filter(doctor =>
      !search ||
      doctor.name.toLowerCase().includes(search) ||
      doctor.specialty.toLowerCase().includes(search)
    );
  }
}