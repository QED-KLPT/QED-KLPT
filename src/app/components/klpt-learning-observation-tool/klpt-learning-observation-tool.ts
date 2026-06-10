import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-klpt',
  imports: [RouterOutlet],
  templateUrl: './klpt-learning-observation-tool.html',
  styleUrl: './klpt-learning-observation-tool.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Klpt {}
