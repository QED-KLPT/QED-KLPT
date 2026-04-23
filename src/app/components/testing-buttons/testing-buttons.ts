import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldButtonComponent } from '../shared/qld-button/qld-button.component';

@Component({
  selector: 'app-testing-buttons',
  imports: [QldButtonComponent],
  templateUrl: './testing-buttons.html',
  styleUrl: './testing-buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingButtons {}
