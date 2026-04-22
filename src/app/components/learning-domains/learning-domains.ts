import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DOMAIN_SUMMARIES } from '../shared/domain-data';
import { DomainCard } from '../shared/domain-card/domain-card';

@Component({
  selector: 'app-learning-domains',
  imports: [DomainCard],
  templateUrl: './learning-domains.html',
  styleUrl: './learning-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningDomains {
  protected readonly domains = DOMAIN_SUMMARIES;
}
