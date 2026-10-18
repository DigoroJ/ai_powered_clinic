import { Injectable } from '@angular/core';

export interface AppointmentData {
  service: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointment: AppointmentData = {
    service: '',
    doctor: '',
    specialty: '',
    date: '',
    time: ''
  };

  setService(service: string): void {
    this.appointment.service = service;
  }

  setDoctor(
    doctor: string,
    specialty: string
  ): void {
    this.appointment.doctor = doctor;
    this.appointment.specialty = specialty;
  }

  setDate(date: string): void {
    this.appointment.date = date;
  }

  setTime(time: string): void {
    this.appointment.time = time;
  }

  getAppointment(): AppointmentData {
    return this.appointment;
  }

  clearAppointment(): void {
    this.appointment = {
      service: '',
      doctor: '',
      specialty: '',
      date: '',
      time: ''
    };
  }

}