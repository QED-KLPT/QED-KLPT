import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldAlertComponent } from '../shared/qld-alert/qld-alert.component';

@Component({
  selector: 'app-testing-alerts',
  imports: [QldAlertComponent],
  templateUrl: './testing-alerts.html',
  styleUrl: './testing-alerts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingAlerts {}
