import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredictionsComponent } from './predictions/predictions.component';
import { ModelComparisonComponent } from './model-comparison/model-comparison.component';
import { ModelPerformanceComponent } from './model-performance/model-performance.component';
import { DemandPredictionComponent } from './demand-prediction/demand-prediction.component';
import { AiTriageComponent } from './ai-triage/ai-triage.component';
import { AiAnalyticsComponent } from './ai-analytics/ai-analytics.component';
import { DatasetEdaComponent } from './dataset-eda/dataset-eda.component';

@NgModule({
  declarations: [
    PredictionsComponent,
    ModelComparisonComponent,
    ModelPerformanceComponent,
    DemandPredictionComponent,
    AiTriageComponent,
    AiAnalyticsComponent,
    DatasetEdaComponent
  ],

  imports: [
    CommonModule,
    FormsModule
  ],

  exports: [
    PredictionsComponent,
    ModelComparisonComponent,
    ModelPerformanceComponent,
    DemandPredictionComponent,
    AiTriageComponent,
    AiAnalyticsComponent,
    DatasetEdaComponent
  ]
})
export class AiModule {}