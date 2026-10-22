import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface QueueAppointment {
  id: number;
  patient_id?: number;
  patient_name?: string;
  patient_first_name?: string;
  patient_last_name?: string;
  doctor_name?: string;
  service_name?: string;
  appointment_date?: string;
  appointment_time?: string;
  status?: string;
}

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.scss']
})
export class NurseDashboardComponent implements OnInit {
  private readonly apiUrl = 'http://localhost:3000/api';

  appointments: QueueAppointment[] = [];
  filteredQueue: QueueAppointment[] = [];

  loading = false;
  errorMessage = '';
  searchTerm = '';
  selectedStatus = 'All';

  stats = {
    total: 0,
    waiting: 0,
    inProgress: 0,
    completed: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQueue();
  }

  loadQueue(): void {
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
        console.error('Unable to load patient queue:', error);
        this.errorMessage =
          'Unable to load the patient queue. Please try again.';
        this.loading = false;
      }
    });
  }

  private extractArray(response: any): QueueAppointment[] {
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

  private normaliseStatus(status?: string): string {
    return (status || '').trim().toLowerCase();
  }

  private calculateStats(): void {
    this.stats.total = this.appointments.length;

    this.stats.waiting = this.appointments.filter(appointment => {
      const status = this.normaliseStatus(appointment.status);

      return status === 'confirmed' ||
        status === 'pending' ||
        status === 'waiting';
    }).length;

    this.stats.inProgress = this.appointments.filter(appointment => {
      const status = this.normaliseStatus(appointment.status);

      return status === 'in progress' ||
        status === 'in_progress' ||
        status === 'in-progress';
    }).length;

    this.stats.completed = this.appointments.filter(
      appointment =>
        this.normaliseStatus(appointment.status) === 'completed'
    ).length;
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredQueue = this.appointments.filter(appointment => {
      const patientName = this.getPatientName(appointment).toLowerCase();
      const service = (appointment.service_name || '').toLowerCase();
      const appointmentId = String(appointment.id);

      const matchesSearch =
        !term ||
        patientName.includes(term) ||
        service.includes(term) ||
        appointmentId.includes(term);

      const status = this.normaliseStatus(appointment.status);
      const matchesStatus =
        this.selectedStatus === 'All' ||
        status === this.normaliseStatus(this.selectedStatus);

      return matchesSearch && matchesStatus;
    });
  }

  getPatientName(appointment: QueueAppointment): string {
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
    const value = this.normaliseStatus(status);

    if (value === 'completed') return 'status-completed';
    if (value === 'confirmed') return 'status-confirmed';
    if (value === 'pending' || value === 'waiting') return 'status-pending';

    if (
      value === 'in progress' ||
      value === 'in_progress' ||
      value === 'in-progress'
    ) {
      return 'status-progress';
    }

    if (value === 'cancelled') return 'status-cancelled';

    return 'status-default';
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
    this.loadQueue();
  }
}