import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-triage',
  templateUrl: './ai-triage.component.html',
  styleUrls: ['./ai-triage.component.scss']
})
export class AiTriageComponent {

  selectedPriority = 'All';

  triageCases = [
    {
      patient: 'Thabo Mokoena',
      symptoms: 'Headache, dizziness, fatigue',
      recommendedService: 'General Consultation',
      priority: 'Medium',
      confidence: 87
    },
    {
      patient: 'Lerato Molefe',
      symptoms: 'Fever, cough, sore throat',
      recommendedService: 'General Consultation',
      priority: 'Medium',
      confidence: 91
    },
    {
      patient: 'Kagiso Ndlovu',
      symptoms: 'High blood pressure, headache',
      recommendedService: 'Chronic Disease',
      priority: 'High',
      confidence: 94
    }
  ];

  get filteredCases() {
    if (this.selectedPriority === 'All') {
      return this.triageCases;
    }

    return this.triageCases.filter(
      item => item.priority === this.selectedPriority
    );
  }
}