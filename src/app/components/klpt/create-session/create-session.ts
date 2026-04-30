import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-session',
  imports: [RouterLink],
  templateUrl: './create-session.html',
  styleUrl: './create-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSession {}
