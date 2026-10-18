import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';

interface Doctor {
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  available: boolean;
}

@Component({
  selector: 'app-select-doctor',
  templateUrl: './select-doctor.component.html',
  styleUrls: ['./select-doctor.component.scss']
})
export class SelectDoctorComponent implements OnInit {

  // =====================================================
  // BOOKING DATA
  // =====================================================

  selectedService: string = '';

  selectedDoctor: string = '';

  selectedDoctorSpecialty: string = '';


  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  searchTerm: string = '';

  selectedCategory: string = 'All';


  // =====================================================
  // DOCTORS
  // =====================================================

  doctors: Doctor[] = [

    {
      name: 'Dr Nomsa Dlamini',
      specialty: 'General Practitioner',
      rating: 4.9,
      experience: 8,
      available: true
    },

    {
      name: 'Dr Aisha Patel',
      specialty: 'Pediatrician',
      rating: 4.9,
      experience: 10,
      available: true
    },

    {
      name: 'Dr Thabo Mokoena',
      specialty: 'Cardiologist',
      rating: 4.8,
      experience: 12,
      available: true
    }

  ];


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}


  // =====================================================
  // INITIALISE
  // =====================================================

  ngOnInit(): void {

    const appointment =
      this.appointmentService.getAppointment();

    if (appointment) {

      this.selectedService =
        appointment.service || '';

      this.selectedDoctor =
        appointment.doctor || '';

      this.selectedDoctorSpecialty =
        appointment.specialty || '';

    }

  }


  // =====================================================
  // SELECT DOCTOR
  // =====================================================

  selectDoctor(doctor: Doctor): void {

    if (!doctor.available) {
      return;
    }

    this.selectedDoctor = doctor.name;

    this.selectedDoctorSpecialty =
      doctor.specialty;

    this.appointmentService.setDoctor(
      doctor.name,
      doctor.specialty
    );

  }


  // =====================================================
  // CONTINUE TO DATE & TIME
  // =====================================================

  continue(): void {

    // Do not continue without selecting a doctor
    if (!this.selectedDoctor) {
      return;
    }

    // Make sure the doctor information is saved
    const selectedDoctor =
      this.doctors.find(
        doctor =>
          doctor.name === this.selectedDoctor
      );

    if (selectedDoctor) {

      this.appointmentService.setDoctor(
        selectedDoctor.name,
        selectedDoctor.specialty
      );

    }

    // Go to the next step
    this.router.navigate([
      '/patient/appointment-date-time'
    ]);

  }


  // =====================================================
  // SEARCH + CATEGORY FILTER
  // =====================================================

  get filteredDoctors(): Doctor[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    return this.doctors.filter(
      doctor => {

        // Search by name or specialty
        const matchesSearch =
          !search ||
          doctor.name
            .toLowerCase()
            .includes(search) ||
          doctor.specialty
            .toLowerCase()
            .includes(search);


        // Category filter
        let matchesCategory = true;

        if (this.selectedCategory !== 'All') {

          switch (this.selectedCategory) {

            case 'GP':
              matchesCategory =
                doctor.specialty
                  .toLowerCase()
                  .includes('general practitioner');
              break;

            case 'Dentist':
              matchesCategory =
                doctor.specialty
                  .toLowerCase()
                  .includes('dentist');
              break;

            case 'Pediatrics':
              matchesCategory =
                doctor.specialty
                  .toLowerCase()
                  .includes('pediatric');
              break;

            default:
              matchesCategory = true;

          }

        }


        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  }

}