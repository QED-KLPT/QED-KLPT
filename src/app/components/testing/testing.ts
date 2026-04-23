import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaLinkComponent } from '../shared/cta-link/cta-link.component';

@Component({
  selector: 'app-testing',
  imports: [RouterLink, CtaLinkComponent],
  templateUrl: './testing.html',
  styleUrl: './testing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testing {}
