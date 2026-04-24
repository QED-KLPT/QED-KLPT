import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type Direction = 'up' | 'down' | 'left' | 'right';

@Component({
  selector: 'app-direction-link',
  imports: [],
  templateUrl: './direction-link.component.html',
  styleUrl: './direction-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionLinkComponent {
  @Input() href = '#';
  @Input() direction: Direction = 'right';
  @Input() ariaLabel: string | undefined = undefined;
  @Input() target: '_self' | '_blank' | undefined = undefined;

  get directionClasses(): string {
    return `klpt__direction-link klpt__direction-link--${this.direction}`;
  }
}
