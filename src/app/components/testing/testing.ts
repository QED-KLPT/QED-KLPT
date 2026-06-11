import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { VidPlayerModule } from '../shared/vid-player/vid-player.module';

@Component({
  selector: 'app-testing',
  imports: [RouterLink, VidPlayerModule],
  templateUrl: './testing.html',
  styleUrl: './testing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testing {}
