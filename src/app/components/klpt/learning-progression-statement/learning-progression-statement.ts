import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-learning-progression-statement',
  imports: [RouterLink],
  templateUrl: './learning-progression-statement.html',
  styleUrl: './learning-progression-statement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningProgressionStatement {}
