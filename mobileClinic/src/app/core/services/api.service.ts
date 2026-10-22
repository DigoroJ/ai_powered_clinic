
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// ==============================
// Symptom Assessment Interfaces
// ==============================

export interface SymptomAssessmentPayload {
  patient_id: number;
  symptoms: string[];
  duration: string;
  severity: string;
  additional_details?: string;
}

export interface SymptomAssessment {
  id: number;
  patient_id: number;
  symptoms: string[];
  duration: string;
  severity: string;
  additional_details: string | null;
  created_at: string;
}

export interface SymptomAssessmentResponse {
  success: boolean;
  message: string;
  data: SymptomAssessment;
}

export interface SymptomAssessmentsListResponse {
  success: boolean;
  data: SymptomAssessment[];
}


// ==============================
// API Service
// ==============================

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}


  // ==============================
  // Services
  // ==============================

  getServices(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/services`
    );
  }


  // ==============================
  // Doctors
  // ==============================

  getDoctors(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/doctors`
    );
  }


  // ==============================
  // Dashboard
  // ==============================

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/dashboard/stats`
    );
  }


  // ==============================
  // Appointments
  // ==============================

  getAppointments(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/appointments`
    );
  }

  getPatientAppointments(
    patientId: string | number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/appointments/patient/${patientId}`
    );
  }

  bookAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/appointments`,
      appointment
    );
  }


  // ==============================
  // Patients
  // ==============================

  getPatients(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/patients`
    );
  }

  createPatient(patient: {
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string | null;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/patients`,
      patient
    );
  }


  // ==============================
  // Nurses
  // ==============================

  getNurses(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/nurses`
    );
  }


  // ==============================
  // Dataset EDA
  // ==============================

  getCurrentDatasetEda(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/dataset/eda/current`
    );
  }


  // ==============================
  // AI Analytics
  // ==============================

  getAiAnalytics(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/ai/analytics`
    );
  }


  // ==============================
  // AI Disease Prediction
  // ==============================

  predictDisease(patientData: {
    fever: number;
    cough: number;
    rash: number;
    headache: number;
    vomiting: number;
    fatigue: number;
    sore_throat: number;
    breathing_issue: number;
    age: number;
    gender: string;
    temperature: number;
    days_symptoms: number;
    travel_history: number;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/ai/triage/predict`,
      patientData
    );
  }


  // ==============================
  // AI Triage Cases
  // ==============================

  getRecentAiTriageCases(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/ai/triage/cases`
    );
  }


  // ==============================
  // Symptom Assessments
  // ==============================

  /**
   * Save a patient's symptom assessment.
   *
   * POST /api/symptom-assessments
   */
  createSymptomAssessment(
    payload: SymptomAssessmentPayload
  ): Observable<SymptomAssessmentResponse> {
    return this.http.post<SymptomAssessmentResponse>(
      `${this.apiUrl}/symptom-assessments`,
      payload
    );
  }


  getPatientSymptomAssessments(
    patientId: number
  ): Observable<SymptomAssessmentsListResponse> {
    return this.http.get<SymptomAssessmentsListResponse>(
      `${this.apiUrl}/symptom-assessments/patient/${patientId}`
    );
  }

}
