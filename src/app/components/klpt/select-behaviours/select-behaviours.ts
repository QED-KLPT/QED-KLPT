import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-behaviours',
  imports: [RouterLink],
  templateUrl: './select-behaviours.html',
  styleUrl: './select-behaviours.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBehaviours {}
