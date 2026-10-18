import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-analytics',
  templateUrl: './ai-analytics.component.html',
  styleUrls: ['./ai-analytics.component.scss']
})
export class AiAnalyticsComponent {

  models = [
    {
      name: 'Random Forest',
      accuracy: 94.2,
      precision: 93.6,
      recall: 92.8
    },
    {
      name: 'Decision Tree',
      accuracy: 89.7,
      precision: 88.9,
      recall: 87.5
    },
    {
      name: 'Logistic Regression',
      accuracy: 87.4,
      precision: 86.8,
      recall: 85.9
    },
    {
      name: 'Support Vector Machine',
      accuracy: 91.8,
      precision: 91.1,
      recall: 90.2
    }
  ];
}