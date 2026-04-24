import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HorizontalRuleComponent } from '../shared/horizontal-rule/horizontal-rule.component';

@Component({
  selector: 'app-testing-horizontal-rule',
  imports: [HorizontalRuleComponent],
  templateUrl: './testing-horizontal-rule.html',
  styleUrl: './testing-horizontal-rule.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingHorizontalRule {}
