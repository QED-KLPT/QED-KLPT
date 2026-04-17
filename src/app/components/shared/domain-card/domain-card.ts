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
    const title = this.title.trim();
    const words = title.split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return title.substring(0, 2).toUpperCase();
  }
}
