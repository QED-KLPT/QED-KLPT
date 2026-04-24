import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlobalAlertComponent } from '../shared/global-alert/global-alert.component';

@Component({
  selector: 'app-testing-global-alert',
  imports: [GlobalAlertComponent],
  templateUrl: './testing-global-alert.html',
  styleUrl: './testing-global-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingGlobalAlert {}
