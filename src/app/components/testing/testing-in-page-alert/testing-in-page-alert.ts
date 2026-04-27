import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-testing-in-page-alert',
  imports: [AlertComponent],
  templateUrl: './testing-in-page-alert.html',
  styleUrl: './testing-in-page-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingInPageAlert {}
