import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-klpt',
  imports: [RouterOutlet],
  templateUrl: './klpt.html',
  styleUrl: './klpt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Klpt {}
