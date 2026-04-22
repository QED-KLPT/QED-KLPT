import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HorizontalNav } from '../horizontal-nav/horizontal-nav';
import { VerticalNav } from '../vertical-nav/vertical-nav';

@Component({
  selector: 'app-header',
  imports: [VerticalNav, HorizontalNav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
}
