import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-sessions',
  imports: [RouterLink],
  templateUrl: './list-sessions.html',
  styleUrl: './list-sessions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSessions {}
