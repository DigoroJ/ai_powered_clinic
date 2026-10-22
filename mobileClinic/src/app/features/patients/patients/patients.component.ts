
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  status: string;
}

interface NewPatient {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  status: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  searchTerm = '';
  selectedStatus = 'All';

  patients: Patient[] = [];

  loading = false;
  errorMessage = '';

  // Add-patient form state
  showAddPatientForm = false;
  savingPatient = false;
  formError = '';
  successMessage = '';

  maxDate = new Date().toISOString().split('T')[0];

  newPatient: NewPatient = this.createEmptyPatient();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Create a fresh form model
  private createEmptyPatient(): NewPatient {
    return {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      status: 'Active'
    };
  }

  // Load patients from the API
  loadPatients(): void {
    this.loading = true;
    this.errorMessage = '';

    this.apiService.getPatients().subscribe({
      next: (response: any) => {
        const rows = Array.isArray(response)
          ? response
          : response?.data ?? response?.patients ?? [];

        this.patients = rows.map((item: any) => ({
          id: String(item.id ?? item.patient_id ?? ''),
          
          name:
            item.name ??
            (
              [
                item.first_name ?? item.firstName,
                item.last_name ?? item.lastName
              ]
                .filter(Boolean)
                .join(' ') || 'Unknown patient'
            ),
          age: Number(item.age ?? this.calculateAge(item.date_of_birth)),
          gender: item.gender ?? 'Not specified',
          phone: item.phone ?? item.phone_number ?? 'Not provided',
          lastVisit: item.last_visit
            ? new Date(item.last_visit).toLocaleDateString()
            : 'No visits recorded',
          status: item.status ?? 'Active'
        }));

        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading patients:', error);
        this.errorMessage = 'Unable to load patients. Please try again.';
        this.loading = false;
      }
    });
  }

  // Show or hide the add-patient form
  toggleAddPatientForm(): void {
    this.showAddPatientForm = !this.showAddPatientForm;
    this.formError = '';
    this.successMessage = '';

    if (!this.showAddPatientForm) {
      this.resetPatientForm();
    }
  }

  // Save a new patient
  addPatient(): void {
    if (this.savingPatient) {
      return;
    }

    const firstName = this.newPatient.firstName.trim();
    const lastName = this.newPatient.lastName.trim();
    const phone = this.newPatient.phone.trim();
    const email = this.newPatient.email.trim();

    this.formError = '';
    this.successMessage = '';

    if (
      !firstName ||
      !lastName ||
      !this.newPatient.dateOfBirth ||
      !this.newPatient.gender ||
      !phone
    ) {
      this.formError = 'Please complete all required fields.';
      return;
    }

    if (this.newPatient.dateOfBirth > this.maxDate) {
      this.formError = 'Date of birth cannot be in the future.';
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: this.newPatient.dateOfBirth,
      gender: this.newPatient.gender,
      phone,
      email: email || null,
      address: this.newPatient.address.trim() || null,
      status: this.newPatient.status
    };

    this.savingPatient = true;

    // Requires ApiService.createPatient(payload).
    this.apiService.createPatient(payload).subscribe({
      next: () => {
        this.savingPatient = false;
        this.showAddPatientForm = false;
        this.resetPatientForm();
        this.successMessage = 'Patient added successfully.';
        this.loadPatients();
      },
      error: (error: any) => {
        console.error('Error adding patient:', error);
        this.formError =
          error?.error?.message ??
          'Unable to add patient. Please check the details and try again.';
        this.savingPatient = false;
      }
    });
  }

  private resetPatientForm(): void {
    this.newPatient = this.createEmptyPatient();
    this.formError = '';
  }

  private calculateAge(dateOfBirth: string | null | undefined): number {
    if (!dateOfBirth) {
      return 0;
    }

    const birthDate = new Date(dateOfBirth);

    if (isNaN(birthDate.getTime())) {
      return 0;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return Math.max(age, 0);
  }

  // Search and status filtering
  get filteredPatients(): Patient[] {
    const search = this.searchTerm.toLowerCase().trim();

    return this.patients.filter(patient => {
      const matchesSearch =
        !search ||
        patient.name.toLowerCase().includes(search) ||
        patient.id.toLowerCase().includes(search) ||
        patient.phone.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        patient.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // Dashboard statistics
  get activePatientsCount(): number {
    return this.patients.filter(
      patient => patient.status === 'Active'
    ).length;
  }

  get followUpCount(): number {
    return this.patients.filter(
      patient => patient.status === 'Follow-up'
    ).length;
  }
}
