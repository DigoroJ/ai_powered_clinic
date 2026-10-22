
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

type AppointmentRole = 'admin' | 'doctor' | 'nurse';

interface Appointment {
  id?: number | string;
  patient: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  role: AppointmentRole = 'admin';
  selectedStatus = 'All';

  appointments: Appointment[] = [];

  loading = false;
  errorMessage = '';

  private routeSubscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe(data => {
      const routeRole = data['role'];

      if (
        routeRole === 'admin' ||
        routeRole === 'doctor' ||
        routeRole === 'nurse'
      ) {
        this.role = routeRole;
      }

      this.loadAppointments();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  // Page configuration

  get pageTitle(): string {
    switch (this.role) {
      case 'doctor':
        return 'My Appointments';
      case 'nurse':
        return 'Clinic Appointments';
      default:
        return 'Appointments';
    }
  }

  get pageDescription(): string {
    switch (this.role) {
      case 'doctor':
        return 'View and manage your assigned patient appointments.';
      case 'nurse':
        return 'View the clinic appointment schedule and patient queue.';
      default:
        return 'Manage patient appointments and schedules.';
    }
  }

  get showDoctorColumn(): boolean {
    return this.role !== 'doctor';
  }

  get canCreateAppointment(): boolean {
    // Adjust this rule to match your clinic's requirements.
    return this.role === 'admin';
  }

  // Load appointments

  loadAppointments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.apiService.getAppointments().subscribe({
      next: (response: any) => {
        const rows = Array.isArray(response)
          ? response
          : response?.data ?? response?.appointments ?? [];

        this.appointments = rows.map((item: any) => ({
          id: item.id ?? item.appointment_id,
          patient:
            item.patient_name ??
            item.patient ??
            'Unknown patient',
          doctor:
            item.doctor_name ??
            item.doctor ??
            'Not assigned',
          service:
            item.service_name ??
            item.service ??
            item.specialty ??
            'Not specified',
          date: item.appointment_date ?? item.date ?? '',
          time: item.appointment_time ?? item.time ?? '',
          status: this.normaliseStatus(item.status)
        }));

        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading appointments:', error);

        this.errorMessage =
          'Unable to load appointments. Please try again.';

        this.loading = false;
      }
    });
  }

  private normaliseStatus(status: unknown): string {
    if (!status) {
      return 'Pending';
    }

    const value = String(status).toLowerCase();

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // Appointment filtering

  get filteredAppointments(): Appointment[] {
    if (this.selectedStatus === 'All') {
      return this.appointments;
    }

    return this.appointments.filter(
      appointment =>
        appointment.status.toLowerCase() ===
        this.selectedStatus.toLowerCase()
    );
  }

  // Statistics

  get todaysAppointments(): number {
    const today = new Date();

    return this.appointments.filter(appointment => {
      if (!appointment.date) {
        return false;
      }

      const date = new Date(appointment.date);

      return !isNaN(date.getTime()) &&
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();
    }).length;
  }

  get pendingAppointments(): number {
    return this.countByStatus('Pending');
  }

  get completedAppointments(): number {
    return this.countByStatus('Completed');
  }

  get cancelledAppointments(): number {
    return this.countByStatus('Cancelled');
  }

  private countByStatus(status: string): number {
    return this.appointments.filter(
      appointment =>
        appointment.status.toLowerCase() === status.toLowerCase()
    ).length;
  }

  // Actions

  createAppointment(): void {
    if (!this.canCreateAppointment) {
      return;
    }

    this.router.navigate(['/patient/book-appointment']);
  }

  openAppointment(appointment: Appointment): void {
    if (!appointment.id) {
      console.warn('This appointment does not have an ID.');
      return;
    }

    // Temporary action until an appointment details route is added.
    console.log('Selected appointment:', appointment);

    // When a details route exists, navigate to it here.
    // Example:
    // this.router.navigate(['/appointments', appointment.id]);
  }
}
