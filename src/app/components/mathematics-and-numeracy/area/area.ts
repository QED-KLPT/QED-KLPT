import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-area',
  imports: [],
  templateUrl: './area.html',
  styleUrl: './area.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Area {}
