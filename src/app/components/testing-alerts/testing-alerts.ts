import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-testing-alerts',
  imports: [AlertComponent],
  templateUrl: './testing-alerts.html',
  styleUrl: './testing-alerts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingAlerts {}
