import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-domains',
  imports: [RouterLink],
  templateUrl: './select-domains.html',
  styleUrl: './select-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDomains {}
