import { Component } from '@angular/core';

@Component({
  selector: 'app-dataset-eda',
  templateUrl: './dataset-eda.component.html',
  styleUrls: ['./dataset-eda.component.scss']
})
export class DatasetEdaComponent {

  datasetName = 'Healthcare Patient Dataset';

  datasetStats = {
    records: 8452,
    features: 18,
    missingValues: 124,
    duplicates: 17
  };

  columns = [
    'Age',
    'Gender',
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Blood Pressure',
    'Diabetes',
    'Symptoms',
    'Recommended Service'
  ];
}