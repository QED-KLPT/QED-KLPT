import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type SpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
  @Input() label = 'Loading...';
  @Input() dark = false;
  @Input() iconOnly = false;
  @Input() landscape = false;
  @Input() size: SpinnerSize = 'md';

  get containerClasses(): string {
    const classes = ['qld__loading_spinner'];
    if (this.dark) classes.push('qld__loading_spinner--dark');
    if (this.iconOnly) classes.push('qld__loading_spinner--icon_only');
    if (this.landscape) classes.push('qld__loading_spinner--landscape');
    return classes.join(' ');
  }

  get wheelSize(): string {
    switch (this.size) {
      case 'sm': return '1rem';
      case 'lg': return '3rem';
      default: return '2rem';
    }
  }

  get labelSize(): string {
    switch (this.size) {
      case 'sm': return 'qld__display-sm';
      case 'lg': return 'qld__display-lg';
      default: return 'qld__display-md';
    }
  }

  get showSm(): boolean { return this.size === 'sm'; }
  get showMd(): boolean { return this.size === 'md'; }
  get showLg(): boolean { return this.size === 'lg'; }

  get labelSizeClass(): string {
    if (this.size === 'sm') return 'qld__display-sm';
    if (this.size === 'lg') return 'qld__display-lg';
    return 'qld__display-md';
  }
}
