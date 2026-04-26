import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOMAIN_SUMMARIES } from '../shared/domain-data';
import { DomainCard } from '../shared/domain-card/domain-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DomainCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly domains = DOMAIN_SUMMARIES;
}
