import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-domain-card',
  imports: [RouterLink],
  templateUrl: './domain-card.html',
  styleUrl: './domain-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomainCard {
  @Input({ required: true }) title = '';
  @Input({ required: true }) description = '';
  @Input({ required: true }) url = '/';
  @Input() imageAlt = '';
  @Input() imageSrc = '';
  @Input() background = '';
  @Input() hoverBorderColor = '';

  get initial(): string {
    return this.title.trim().charAt(0).toUpperCase();
  }
}
