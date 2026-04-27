import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  imports: [Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
}
