import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CtaLinkComponent } from '../../shared/cta-link/cta-link.component';

@Component({
  selector: 'app-testing-buttons',
  imports: [CtaLinkComponent],
  templateUrl: './testing-buttons.html',
  styleUrl: './testing-buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingButtons {}
