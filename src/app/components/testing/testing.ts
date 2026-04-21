import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testing',
  imports: [RouterLink],
  templateUrl: './testing.html',
  styleUrl: './testing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testing {}
