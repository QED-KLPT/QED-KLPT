import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-testing-in-page-alert',
  imports: [],
  templateUrl: './testing-in-page-alert.html',
  styleUrl: './testing-in-page-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingInPageAlert {}
