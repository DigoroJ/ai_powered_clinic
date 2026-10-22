import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Appointment {
  id: number;
  patient_id?: number;
  patient_name?: string;
  patient_first_name?: string;
  patient_last_name?: string;
  doctor_id?: number;
  doctor_name?: string;
  service_name?: string;
  appointment_date?: string;
  appointment_time?: string;
  status?: string;
}

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  private readonly apiUrl = 'http://localhost:3000/api';

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  loading = false;
  errorMessage = '';
  searchTerm = '';
  selectedStatus = 'All';

  stats = {
    total: 0,
    today: 0,
    pending: 0,
    completed: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any>(`${this.apiUrl}/appointments`).subscribe({
      next: (response) => {
        this.appointments = this.extractArray(response);
        this.calculateStats();
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Unable to load appointments:', error);
        this.errorMessage =
          'Unable to load appointments. Please check your connection and try again.';
        this.loading = false;
      }
    });
  }

  private extractArray(response: any): Appointment[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.appointments)) {
      return response.appointments;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  }

  private calculateStats(): void {
    const today = this.formatDate(new Date());

    this.stats.total = this.appointments.length;

    this.stats.today = this.appointments.filter(
      appointment =>
        this.formatDate(appointment.appointment_date) === today
    ).length;

    this.stats.pending = this.appointments.filter(
      appointment => this.normaliseStatus(appointment.status) === 'pending'
    ).length;

    this.stats.completed = this.appointments.filter(
      appointment => this.normaliseStatus(appointment.status) === 'completed'
    ).length;
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredAppointments = this.appointments.filter(appointment => {
      const patientName = this.getPatientName(appointment).toLowerCase();
      const service = (appointment.service_name || '').toLowerCase();
      const id = String(appointment.id);

      const matchesSearch =
        !term ||
        patientName.includes(term) ||
        service.includes(term) ||
        id.includes(term);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        this.normaliseStatus(appointment.status) ===
          this.normaliseStatus(this.selectedStatus);

      return matchesSearch && matchesStatus;
    });
  }

  getPatientName(appointment: Appointment): string {
    if (appointment.patient_name) {
      return appointment.patient_name;
    }

    const fullName = [
      appointment.patient_first_name,
      appointment.patient_last_name
    ].filter(Boolean).join(' ');

    return fullName || (
      appointment.patient_id
        ? `Patient #${appointment.patient_id}`
        : 'Patient details unavailable'
    );
  }

  getStatusClass(status?: string): string {
    const normalised = this.normaliseStatus(status);

    if (normalised === 'completed') return 'status-completed';
    if (normalised === 'confirmed') return 'status-confirmed';
    if (normalised === 'pending') return 'status-pending';
    if (normalised === 'cancelled') return 'status-cancelled';

    return 'status-default';
  }

  private normaliseStatus(status?: string): string {
    return (status || '').trim().toLowerCase();
  }

  private formatDate(value?: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value).slice(0, 10);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatDisplayDate(value?: string): string {
    if (!value) return '—';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  retry(): void {
    this.loadAppointments();
  }
}