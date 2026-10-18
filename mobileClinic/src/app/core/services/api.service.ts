
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/services`
    );
  }

  // Get all doctors
  getDoctors(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/doctors`
    );
  }

  // Get dashboard statistics
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/dashboard/stats`
    );
  }

  // Get all appointments
  getAppointments(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/appointments`
    );
  }

  // Get appointments for a specific patient
  getPatientAppointments(patientId: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/appointments/patient/${patientId}`
    );
  }

  // Book an appointment
  bookAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/appointments`,
      appointment
    );
  }

  getPatients(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/patients`
    );
  }

  getNurses(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/nurses`
    );
  }
}
