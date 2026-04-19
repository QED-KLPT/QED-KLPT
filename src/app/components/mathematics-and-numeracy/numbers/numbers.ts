import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-numbers',
  imports: [],
  templateUrl: './numbers.html',
  styleUrl: './numbers.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Numbers {}
