import { Component } from '@angular/core';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss']
})
export class NursesComponent {

  nurses = [
    {
      name: 'Nurse Patricia Maseko',
      department: 'General Care',
      phone: '071 111 2233',
      shift: 'Morning',
      status: 'On Duty'
    },
    {
      name: 'Nurse Boitumelo Radebe',
      department: 'Pediatrics',
      phone: '072 444 5566',
      shift: 'Afternoon',
      status: 'On Duty'
    },
    {
      name: 'Nurse Sarah Nkosi',
      department: 'Chronic Care',
      phone: '083 777 8899',
      shift: 'Morning',
      status: 'Off Duty'
    }
  ];

  searchTerm = '';

  get filteredNurses() {
    const search = this.searchTerm.toLowerCase().trim();

    return this.nurses.filter(nurse =>
      !search ||
      nurse.name.toLowerCase().includes(search) ||
      nurse.department.toLowerCase().includes(search)
    );
  }
}