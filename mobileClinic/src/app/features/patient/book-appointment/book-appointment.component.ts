import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {

  services: any[] = [];

  loading = false;

  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {

    this.loading = true;
    this.error = '';

    this.apiService.getServices().subscribe({

      next: (response: any) => {

        console.log('API response:', response);

        this.services = response.data;

        this.loading = false;

      },

      error: (error: any) => {

        console.error('API error:', error);

        this.error = 'Unable to load services.';

        this.loading = false;

      }

    });

  }

}