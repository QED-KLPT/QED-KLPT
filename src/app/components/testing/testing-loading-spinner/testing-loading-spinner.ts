import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-testing-loading-spinner',
  imports: [LoadingSpinnerComponent, CardComponent],
  templateUrl: './testing-loading-spinner.html',
  styleUrl: './testing-loading-spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingLoadingSpinner {}
