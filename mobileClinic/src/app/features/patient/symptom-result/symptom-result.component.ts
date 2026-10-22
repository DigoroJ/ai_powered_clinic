
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SymptomAssessment
} from '../../../core/services/api.service';

interface AssessmentView {
  id?: number;
  symptoms: string[];
  duration: string;
  severity: string;
  additional_details?: string | null;
  created_at?: string;
}

@Component({
  selector: 'app-symptom-result',
  templateUrl: './symptom-result.component.html',
  styleUrls: ['./symptom-result.component.scss']
})
export class SymptomResultComponent implements OnInit {

  assessment: AssessmentView | null = null;
  errorMessage = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigationAssessment =
      this.router.getCurrentNavigation()?.extras?.state?.['assessment'];

    const savedAssessment =
      navigationAssessment ?? history.state?.assessment;

    if (!savedAssessment) {
      this.errorMessage =
        'No symptom assessment was found. Please complete the symptom checker first.';
      return;
    }

    this.setAssessment(savedAssessment);
  }

  private setAssessment(data: Partial<SymptomAssessment>): void {
    if (
      !Array.isArray(data.symptoms) ||
      !data.duration ||
      !data.severity
    ) {
      this.errorMessage =
        'The assessment information is incomplete. Please complete the symptom checker again.';
      return;
    }

    this.assessment = {
      id: data.id,
      symptoms: data.symptoms,
      duration: data.duration,
      severity: data.severity,
      additional_details: data.additional_details,
      created_at: data.created_at
    };
  }

  get durationLabel(): string {
    const labels: Record<string, string> = {
      today: 'Today',
      'few-days': '2–3 days',
      week: 'About a week',
      longer: 'More than a week'
    };

    return this.assessment
      ? labels[this.assessment.duration] ?? this.assessment.duration
      : '';
  }

  get severityLabel(): string {
    const labels: Record<string, string> = {
      mild: 'Mild',
      moderate: 'Moderate',
      severe: 'Severe'
    };

    return this.assessment
      ? labels[this.assessment.severity] ?? this.assessment.severity
      : '';
  }

  formatDate(dateValue?: string | null): string {
  if (!dateValue) {
    return 'Date unavailable';
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}

  bookAppointment(): void {
    this.router.navigate(['/patient/book-appointment']);
  }

  goBack(): void {
    this.router.navigate(['/patient/symptom-checker']);
  }

  goToDashboard(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  restartChecker(): void {
    this.router.navigate(['/patient/symptom-checker']);
  }
}
