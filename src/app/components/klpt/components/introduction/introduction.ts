import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Introduction {}
