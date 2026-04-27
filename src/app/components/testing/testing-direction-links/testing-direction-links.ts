import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DirectionLinkComponent } from '../../shared/direction-link/direction-link.component';

@Component({
  selector: 'app-testing-direction-links',
  imports: [DirectionLinkComponent],
  templateUrl: './testing-direction-links.html',
  styleUrl: './testing-direction-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingDirectionLinks {}
