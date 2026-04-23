import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type HrSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-horizontal-rule',
  imports: [],
  templateUrl: './horizontal-rule.component.html',
  styleUrl: './horizontal-rule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRuleComponent {
  @Input() size: HrSize = 'sm';
  @Input() decorative = true;

  get hrClasses(): string {
    const classes: string[] = ['qld__horizontal-rule'];

    switch (this.size) {
      case 'md':
        classes.push('qld__horizontal-rule--md');
        break;
      case 'lg':
        classes.push('qld__horizontal-rule--lg');
        break;
    }

    return classes.join(' ');
  }

  get ariaHidden(): string | null {
    return this.decorative ? 'true' : null;
  }
}
