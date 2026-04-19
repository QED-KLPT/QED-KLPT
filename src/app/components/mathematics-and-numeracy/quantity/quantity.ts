import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-quantity',
  imports: [],
  templateUrl: './quantity.html',
  styleUrl: './quantity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Quantity {}
