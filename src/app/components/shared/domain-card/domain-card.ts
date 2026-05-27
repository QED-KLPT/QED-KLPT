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
  @Input() textColor = '';

  get resolvedTextColor(): string {
    return this.textColor || (this.background.includes('135deg') ? '#ffffff' : '');
  }

  get initial(): string {
    return this.title.trim().charAt(0).toUpperCase();
  }

  get hasUrl(): boolean {
    return this.url.trim().length > 0;
  }
}
