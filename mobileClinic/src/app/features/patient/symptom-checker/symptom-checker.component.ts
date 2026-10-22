
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Symptom {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-symptom-checker',
  templateUrl: './symptom-checker.component.html',
  styleUrls: ['./symptom-checker.component.scss']
})
export class SymptomCheckerComponent {

  symptoms: Symptom[] = [
    { id: 'fever', name: 'Fever', icon: 'thermostat' },
    { id: 'headache', name: 'Headache', icon: 'sick' },
    { id: 'cough', name: 'Cough', icon: 'air' },
    { id: 'sore-throat', name: 'Sore throat', icon: 'record_voice_over' },
    { id: 'runny-nose', name: 'Runny nose', icon: 'masks' },
    { id: 'stomach-pain', name: 'Stomach pain', icon: 'healing' },
    { id: 'vomiting', name: 'Vomiting', icon: 'sick' },
    { id: 'diarrhea', name: 'Diarrhea', icon: 'water_drop' },
    { id: 'fatigue', name: 'Fatigue', icon: 'battery_alert' },
    { id: 'dizziness', name: 'Dizziness', icon: 'sync_problem' },
    { id: 'back-pain', name: 'Back pain', icon: 'accessibility' },
    { id: 'skin-problem', name: 'Skin problem', icon: 'face' }
  ];

  selectedSymptoms: string[] = [];
  duration = '';
  severity = '';

  constructor(private router: Router) {}

  toggleSymptom(symptomId: string): void {
    const index = this.selectedSymptoms.indexOf(symptomId);

    if (index > -1) {
      this.selectedSymptoms.splice(index, 1);
    } else {
      this.selectedSymptoms.push(symptomId);
    }
  }

  isSelected(symptomId: string): boolean {
    return this.selectedSymptoms.includes(symptomId);
  }

  canContinue(): boolean {
    return (
      this.selectedSymptoms.length > 0 &&
      this.duration !== '' &&
      this.severity !== ''
    );
  }

  checkSymptoms(): void {
    if (!this.canContinue()) {
      return;
    }

    const assessment = {
      symptoms: this.selectedSymptoms.map(id => {
        const symptom = this.symptoms.find(item => item.id === id);
        return symptom ? symptom.name : id;
      }),
      duration: this.duration,
      severity: this.severity,
      createdAt: new Date().toISOString()
    };

    // Pass the assessment to the results page through router state.
    this.router.navigate(
      ['/patient/symptom-result'],
      { state: { assessment } }
    );
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}